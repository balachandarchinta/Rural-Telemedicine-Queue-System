from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import database, models, schemas, auth

router = APIRouter(prefix="/doctors", tags=["doctors"])

@router.get("/", response_model=List[schemas.DoctorProfileResponse])
def get_doctors(db: Session = Depends(database.get_db)):
    return db.query(models.DoctorProfile).all()

@router.get("/{doctor_id}", response_model=schemas.DoctorProfileResponse)
def get_doctor(doctor_id: int, db: Session = Depends(database.get_db)):
    return db.query(models.DoctorProfile).filter(models.DoctorProfile.id == doctor_id).first()
