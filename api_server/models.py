from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Enum, Text
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import enum
from .database import Base

class RoleEnum(str, enum.Enum):
    admin = "admin"
    doctor = "doctor"
    patient = "patient"
    
class StatusEnum(str, enum.Enum):
    pending = "pending"
    active = "active"
    completed = "completed"
    cancelled = "cancelled"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    role = Column(Enum(RoleEnum), default=RoleEnum.patient)
    is_active = Column(Boolean, default=True)

    patient_profile = relationship("PatientProfile", back_populates="user", uselist=False)
    doctor_profile = relationship("DoctorProfile", back_populates="user", uselist=False)

class PatientProfile(Base):
    __tablename__ = "patient_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    age = Column(Integer, nullable=True)
    gender = Column(String, nullable=True)
    contact_number = Column(String, nullable=True)
    address = Column(String, nullable=True)
    medical_history = Column(Text, nullable=True)

    user = relationship("User", back_populates="patient_profile")
    appointments = relationship("Appointment", back_populates="patient")

class Hospital(Base):
    __tablename__ = "hospitals"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String)
    contact = Column(String, nullable=True)
    description = Column(Text, nullable=True)

    doctors = relationship("DoctorProfile", back_populates="hospital")

class DoctorProfile(Base):
    __tablename__ = "doctor_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    hospital_id = Column(Integer, ForeignKey("hospitals.id"))
    specialization = Column(String)
    experience_years = Column(Integer, nullable=True)
    is_available = Column(Boolean, default=True)

    user = relationship("User", back_populates="doctor_profile")
    hospital = relationship("Hospital", back_populates="doctors")
    appointments = relationship("Appointment", back_populates="doctor")

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patient_profiles.id"))
    doctor_id = Column(Integer, ForeignKey("doctor_profiles.id"))
    symptoms = Column(Text, nullable=True)
    status = Column(Enum(StatusEnum), default=StatusEnum.pending)
    queue_number = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    scheduled_time = Column(DateTime, nullable=True)

    patient = relationship("PatientProfile", back_populates="appointments")
    doctor = relationship("DoctorProfile", back_populates="appointments")
    prescription = relationship("Prescription", back_populates="appointment", uselist=False)

class Prescription(Base):
    __tablename__ = "prescriptions"

    id = Column(Integer, primary_key=True, index=True)
    appointment_id = Column(Integer, ForeignKey("appointments.id"))
    medications = Column(Text) # Plain text for simple MVP
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    appointment = relationship("Appointment", back_populates="prescription")
