from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import database, models, schemas, auth

router = APIRouter(prefix="/queue", tags=["queue"])

@router.get("/{doctor_id}", response_model=List[schemas.AppointmentResponse])
def get_doctor_queue(doctor_id: int, db: Session = Depends(database.get_db)):
    # Returns all pending and active appointments for the given doctor, ordered by queue number
    appointments = db.query(models.Appointment).filter(
        models.Appointment.doctor_id == doctor_id,
        models.Appointment.status.in_([models.StatusEnum.pending, models.StatusEnum.active])
    ).order_by(models.Appointment.queue_number.asc()).all()
    
    return appointments
