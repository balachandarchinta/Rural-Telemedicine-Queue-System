from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import database, models, schemas, auth

router = APIRouter(prefix="/hospitals", tags=["hospitals"])

@router.get("/", response_model=List[schemas.HospitalResponse])
def get_hospitals(db: Session = Depends(database.get_db)):
    return db.query(models.Hospital).all()

@router.post("/", response_model=schemas.HospitalResponse)
def create_hospital(
    hospital: schemas.HospitalCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.require_role([models.RoleEnum.admin]))
):
    db_hospital = models.Hospital(**hospital.model_dump())
    db.add(db_hospital)
    db.commit()
    db.refresh(db_hospital)
    return db_hospital

@router.get("/{hospital_id}/doctors", response_model=List[schemas.DoctorProfileResponse])
def get_hospital_doctors(hospital_id: int, db: Session = Depends(database.get_db)):
    doctors = db.query(models.DoctorProfile).filter(models.DoctorProfile.hospital_id == hospital_id).all()
    return doctors
