import os

from fastapi import APIRouter, UploadFile, File, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User
from app.models.file import File as FileModel
from app.utils.jwt_handler import verify_access_token

from app.services.s3_service import (
    upload_file,
    generate_download_url,
    list_files,
    delete_file
)

router = APIRouter()

# JWT Authentication
security = HTTPBearer()


@router.post("/upload")
async def upload(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    # Extract JWT Token
    token = credentials.credentials

    # Verify JWT
    payload = verify_access_token(token)

    if payload is None:
        return {
            "message": "Invalid Token"
        }

    # Get logged-in user's email
    email = payload["sub"]

    # Find user in database
    db_user = db.query(User).filter(
        User.email == email
    ).first()

    if db_user is None:
        return {
            "message": "User not found"
        }

    # Save uploaded file temporarily
    file_path = f"temp_{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    # Get file size
    file_size = os.path.getsize(file_path)

    # Upload to AWS S3
    file_url = upload_file(file_path, file.filename)

    # Delete temporary file
    os.remove(file_path)

    # Save metadata in PostgreSQL
    new_file = FileModel(
        filename=file.filename,
        file_url=file_url,
        file_size=file_size,
        user_id=db_user.id
    )

    db.add(new_file)
    db.commit()
    db.refresh(new_file)

    return {
        "message": "File uploaded successfully",
        "filename": file.filename,
        "file_url": file_url
    }


@router.get("/download/{file_name}")
async def download(file_name: str):

    url = generate_download_url(file_name)

    return {
        "download_url": url
    }


@router.get("/files")
async def get_files(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    # Get JWT token
    token = credentials.credentials

    # Verify JWT
    payload = verify_access_token(token)

    if payload is None:
        return {
            "message": "Invalid Token"
        }

    # Get user email from JWT
    email = payload["sub"]

    # Find logged-in user
    db_user = db.query(User).filter(
        User.email == email
    ).first()

    if db_user is None:
        return {
            "message": "User not found"
        }


@router.delete("/delete/{file_name}")
async def delete(file_name: str):

    delete_file(file_name)

    return {
        "message": "File deleted successfully"
    }