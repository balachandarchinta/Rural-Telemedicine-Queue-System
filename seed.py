import os
from sqlalchemy.orm import Session
from api_server.database import engine, SessionLocal, Base
from api_server.models import User, RoleEnum, Hospital, DoctorProfile
from api_server.auth import get_password_hash

def seed_data():
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    
    db: Session = SessionLocal()
    
    try:
        # Check if already seeded
        if db.query(Hospital).first():
            print("Database already seeded.")
            return

        # 1. Create an admin user
        admin = User(
            email="admin@rtqs.com",
            hashed_password=get_password_hash("admin123"),
            full_name="System Admin",
            role=RoleEnum.admin
        )
        db.add(admin)
        db.commit()

        # 2. Create sample hospitals
        hospitals = [
            Hospital(name="Rural Health Center A", location="Village X", description="Primary health center for Village X"),
            Hospital(name="District Hospital Y", location="Town Y", description="Main district hospital"),
        ]
        db.add_all(hospitals)
        db.commit()

        for h in hospitals:
            db.refresh(h)

        # 3. Create doctors and their profiles
        doctors_data = [
            {
                "email": "dr.smith@rtqs.com",
                "full_name": "Dr. John Smith",
                "specialization": "General Physician",
                "hospital": hospitals[0],
                "experience": 10
            },
            {
                "email": "dr.jane@rtqs.com",
                "full_name": "Dr. Jane Doe",
                "specialization": "Pediatrician",
                "hospital": hospitals[1],
                "experience": 5
            }
        ]

        for data in doctors_data:
            # Create user
            doc_user = User(
                email=data["email"],
                hashed_password=get_password_hash("doctor123"),
                full_name=data["full_name"],
                role=RoleEnum.doctor
            )
            db.add(doc_user)
            db.commit()
            db.refresh(doc_user)
            
            # Create doctor profile
            doc_profile = DoctorProfile(
                user_id=doc_user.id,
                hospital_id=data["hospital"].id,
                specialization=data["specialization"],
                experience_years=data["experience"]
            )
            db.add(doc_profile)
        
        db.commit()
        print("Database successfully seeded with hospitals and doctors.")
        
    except Exception as e:
        print(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
