from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import database, models, schemas, auth

router = APIRouter(prefix="/appointments", tags=["appointments"])

@router.post("/", response_model=schemas.AppointmentResponse)
def create_appointment(
    appointment: schemas.AppointmentCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.require_role([models.RoleEnum.patient]))
):
    patient_profile = db.query(models.PatientProfile).filter(models.PatientProfile.user_id == current_user.id).first()
    if not patient_profile:
        raise HTTPException(status_code=400, detail="Patient profile not found")

    doctor = db.query(models.DoctorProfile).filter(models.DoctorProfile.id == appointment.doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    # Generate queue number (simple MVP: count pending/active appointments for this doctor today)
    from datetime import datetime, timezone
    today = datetime.now(timezone.utc).date()
    
    # Very simple queue counting logic
    count = db.query(models.Appointment).filter(
        models.Appointment.doctor_id == appointment.doctor_id,
        models.Appointment.status.in_([models.StatusEnum.pending, models.StatusEnum.active])
    ).count()

    db_appointment = models.Appointment(
        patient_id=patient_profile.id,
        doctor_id=appointment.doctor_id,
        symptoms=appointment.symptoms,
        scheduled_time=appointment.scheduled_time,
        queue_number=count + 1,
        status=models.StatusEnum.pending
    )
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

@router.get("/my", response_model=List[schemas.AppointmentResponse])
def get_my_appointments(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
):
    if current_user.role == models.RoleEnum.patient:
        patient_profile = db.query(models.PatientProfile).filter(models.PatientProfile.user_id == current_user.id).first()
        return db.query(models.Appointment).filter(models.Appointment.patient_id == patient_profile.id).all()
    elif current_user.role == models.RoleEnum.doctor:
        doctor_profile = db.query(models.DoctorProfile).filter(models.DoctorProfile.user_id == current_user.id).first()
        return db.query(models.Appointment).filter(models.Appointment.doctor_id == doctor_profile.id).all()
    return []

@router.patch("/{appointment_id}/status", response_model=schemas.AppointmentResponse)
def update_appointment_status(
    appointment_id: int,
    status: models.StatusEnum,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.require_role([models.RoleEnum.doctor, models.RoleEnum.admin]))
):
    appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    appointment.status = status
    db.commit()
    db.refresh(appointment)
    return appointment
