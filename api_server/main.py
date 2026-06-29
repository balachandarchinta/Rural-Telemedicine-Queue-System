from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .database import engine
from .routers import auth_router, users, hospitals, doctors, appointments, prescriptions, queue

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Rural Telemedicine Queue System API")

# Configure CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(users.router)
app.include_router(hospitals.router)
app.include_router(doctors.router)
app.include_router(appointments.router)
app.include_router(queue.router)
app.include_router(prescriptions.router)

@app.get("/")
def root():
    return {"message": "Welcome to the RTQS API"}
