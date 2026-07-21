from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models.file import File
from app.models.user import User

from app.database.database import engine, Base

from app.routes.auth import router as auth_router
from app.routes.file import router as file_router
from app.routes.dashboard import router as dashboard_router
from app.routes.profile import router as profile_router

from app.config.settings import APP_NAME, APP_VERSION, DEBUG
from app.config.logger import logger


# Create Database Tables
Base.metadata.create_all(bind=engine)


# Create FastAPI App
app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
    debug=DEBUG
)


# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register Routes
app.include_router(auth_router)
app.include_router(file_router)
app.include_router(dashboard_router)
app.include_router(profile_router)


logger.info("Cloud Storage API Started Successfully")


# Health Check
@app.get("/health")
def health():
    return {
        "status": "OK",
        "message": "Cloud Storage API is healthy"
    }