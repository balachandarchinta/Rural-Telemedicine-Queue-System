from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from .models import RoleEnum, StatusEnum

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: RoleEnum = RoleEnum.patient

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[RoleEnum] = None
    user_id: Optional[int] = None

class PatientProfileBase(BaseModel):
    age: Optional[int] = None
    gender: Optional[str] = None
    contact_number: Optional[str] = None
    address: Optional[str] = None
    medical_history: Optional[str] = None

class PatientProfileCreate(PatientProfileBase):
    pass

class PatientProfileResponse(PatientProfileBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

class HospitalBase(BaseModel):
    name: str
    location: str
    contact: Optional[str] = None
    description: Optional[str] = None

class HospitalCreate(HospitalBase):
    pass

class HospitalResponse(HospitalBase):
    id: int

    class Config:
        from_attributes = True

class DoctorProfileBase(BaseModel):
    hospital_id: int
    specialization: str
    experience_years: Optional[int] = None
    is_available: bool = True

class DoctorProfileCreate(DoctorProfileBase):
    pass

class DoctorProfileResponse(DoctorProfileBase):
    id: int
    user_id: int
    user: UserResponse
    hospital: HospitalResponse

    class Config:
        from_attributes = True

class AppointmentBase(BaseModel):
    doctor_id: int
    symptoms: Optional[str] = None
    scheduled_time: Optional[datetime] = None

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentResponse(BaseModel):
    id: int
    patient_id: int
    doctor_id: int
    symptoms: Optional[str]
    status: StatusEnum
    queue_number: Optional[int]
    created_at: datetime
    scheduled_time: Optional[datetime]
    
    doctor: Optional[DoctorProfileResponse] = None

    class Config:
        from_attributes = True

class PrescriptionBase(BaseModel):
    medications: str
    notes: Optional[str] = None

class PrescriptionCreate(PrescriptionBase):
    appointment_id: int

class PrescriptionResponse(PrescriptionBase):
    id: int
    appointment_id: int
    created_at: datetime

    class Config:
        from_attributes = True
