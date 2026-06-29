import os
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from fpdf import FPDF
from .. import database, models, schemas, auth

router = APIRouter(prefix="/prescriptions", tags=["prescriptions"])

def create_prescription_pdf(prescription: models.Prescription, patient: models.PatientProfile, doctor: models.DoctorProfile):
    pdf = FPDF()
    pdf.add_page()
    
    # Title
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(200, 10, txt="Medical Prescription", ln=True, align='C')
    
    pdf.set_font("Arial", size=12)
    pdf.ln(10)
    
    # Doctor info
    pdf.cell(200, 10, txt=f"Doctor: {doctor.user.full_name} ({doctor.specialization})", ln=True)
    pdf.cell(200, 10, txt=f"Hospital: {doctor.hospital.name}", ln=True)
    pdf.ln(5)
    
    # Patient info
    pdf.cell(200, 10, txt=f"Patient: {patient.user.full_name}", ln=True)
    pdf.cell(200, 10, txt=f"Age/Gender: {patient.age} / {patient.gender}", ln=True)
    pdf.ln(10)
    
    # Prescription details
    pdf.set_font("Arial", 'B', 14)
    pdf.cell(200, 10, txt="Medications:", ln=True)
    pdf.set_font("Arial", size=12)
    pdf.multi_cell(0, 10, txt=prescription.medications)
    pdf.ln(5)
    
    if prescription.notes:
        pdf.set_font("Arial", 'B', 14)
        pdf.cell(200, 10, txt="Notes:", ln=True)
        pdf.set_font("Arial", size=12)
        pdf.multi_cell(0, 10, txt=prescription.notes)
    
    pdf.ln(20)
    pdf.cell(200, 10, txt=f"Date: {prescription.created_at.strftime('%Y-%m-%d')}", ln=True)
    
    # Ensure a directory for pdfs exists
    os.makedirs("generated_pdfs", exist_ok=True)
    file_path = f"generated_pdfs/prescription_{prescription.id}.pdf"
    pdf.output(file_path)
    return file_path

@router.post("/", response_model=schemas.PrescriptionResponse)
def create_prescription(
    prescription: schemas.PrescriptionCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.require_role([models.RoleEnum.doctor]))
):
    appointment = db.query(models.Appointment).filter(models.Appointment.id == prescription.appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
        
    db_prescription = models.Prescription(
        appointment_id=prescription.appointment_id,
        medications=prescription.medications,
        notes=prescription.notes
    )
    db.add(db_prescription)
    
    # Mark appointment as completed
    appointment.status = models.StatusEnum.completed
    
    db.commit()
    db.refresh(db_prescription)
    return db_prescription

@router.get("/{prescription_id}/download")
def download_prescription(
    prescription_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
):
    prescription = db.query(models.Prescription).filter(models.Prescription.id == prescription_id).first()
    if not prescription:
        raise HTTPException(status_code=404, detail="Prescription not found")
        
    appointment = prescription.appointment
    
    # Generate PDF
    file_path = create_prescription_pdf(prescription, appointment.patient, appointment.doctor)
    return FileResponse(path=file_path, filename=f"prescription_{prescription_id}.pdf", media_type='application/pdf')
