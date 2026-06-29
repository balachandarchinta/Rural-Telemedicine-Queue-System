from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import database, models, schemas, auth

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me", response_model=schemas.UserResponse)
def read_users_me(current_user: models.User = Depends(auth.get_current_active_user)):
    return current_user

@router.get("/me/patient_profile", response_model=schemas.PatientProfileResponse)
def get_patient_profile(
    current_user: models.User = Depends(auth.require_role([models.RoleEnum.patient])),
    db: Session = Depends(database.get_db)
):
    profile = db.query(models.PatientProfile).filter(models.PatientProfile.user_id == current_user.id).first()
    return profile
