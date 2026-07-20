import os
import uuid
from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends,
    HTTPException,
    status,
)
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User
from app.models.file import File as FileModel
from app.utils.jwt_handler import verify_access_token

from app.services.s3_service import (
    upload_file,
    generate_download_url,
    delete_file
)

router = APIRouter()

security = HTTPBearer()


# -------------------------------
# Upload File
# -------------------------------
@router.post("/upload")
async def upload(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    # Get JWT Token
    token = credentials.credentials

    # Verify JWT
    payload = verify_access_token(token)

    if payload is None:
        raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid Token"
    )

    # Get logged-in user's email
    email = payload["sub"]

    # Find user in database
    db_user = db.query(User).filter(
        User.email == email
    ).first()

    if db_user is None:
        raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found"
    )
    
    # Check if the logged-in user already has a file with the same name
    existing_file = db.query(FileModel).filter(
    FileModel.user_id == db_user.id,
    FileModel.filename == file.filename
    ).first()

    if existing_file:
        raise HTTPException(
        status_code=status.HTTP_409_CONFLICT,
        detail="File already exists"
    )
    import os

    os.makedirs("temp_screenshots", exist_ok=True)
    # Save uploaded file temporarily
    file_path = f"temp_{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    # Get file size
    file_size = os.path.getsize(file_path)

    # Generate unique filename for S3
    stored_filename = f"{uuid.uuid4()}_{file.filename}"

    # Check storage limit
    if db_user.storage_used + file_size > db_user.storage_limit:
        os.remove(file_path)

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Storage limit exceeded (5 GB)"
        )

    # Upload to AWS S3
    file_url = upload_file(file_path, stored_filename)

    # Delete temporary file
    os.remove(file_path)

    # Save metadata
    new_file = FileModel(
    filename=file.filename,
    stored_filename=stored_filename,
    file_url=file_url,
    file_size=file_size,
    user_id=db_user.id
)

    db.add(new_file)

    # Update user's used storage
    db_user.storage_used += file_size

    db.commit()
    db.refresh(new_file)

    return {
        "message": "File uploaded successfully",
        "filename": file.filename,
        "file_url": file_url
    }


# -------------------------------
# Download File
# -------------------------------
@router.get("/download/{file_name:path}")
async def download(
    file_name: str,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    # Get JWT Token
    token = credentials.credentials

    # Verify JWT
    payload = verify_access_token(token)

    if payload is None:
        return {
            "message": "Invalid Token"
        }   

    # Get logged-in user's email
    email = payload["sub"]

    # Find user
    db_user = db.query(User).filter(
        User.email == email
    ).first()

    if db_user is None:
        return {
            "message": "User not found"
        }

    # Check whether this file belongs to the logged-in user
    db_file = db.query(FileModel).filter(
        FileModel.filename == file_name,
        FileModel.user_id == db_user.id
    ).first()

    if db_file is None:
        return {
            "message": "File not found or access denied"
        }

    # Generate secure S3 download URL
    url = generate_download_url(db_file.stored_filename)

    return {
        "download_url": url
    }


# -------------------------------
# Show Logged-in User Files
# -------------------------------
@router.get("/files")
async def get_files(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    token = credentials.credentials

    payload = verify_access_token(token)

    if payload is None:
        return {
            "message": "Invalid Token"
        }

    email = payload["sub"]

    db_user = db.query(User).filter(
        User.email == email
    ).first()

    if db_user is None:
        return {
            "message": "User not found"
        }

    user_files = db.query(FileModel).filter(
        FileModel.user_id == db_user.id
    ).all()

    return user_files


# -------------------------------
# Delete File
# -------------------------------
@router.delete("/delete/{file_name:path}")
async def delete(
    file_name: str,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    token = credentials.credentials

    payload = verify_access_token(token)

    if payload is None:
        return {
            "message": "Invalid Token"
        }

    email = payload["sub"]

    db_user = db.query(User).filter(
        User.email == email
    ).first()

    if db_user is None:
        return {
            "message": "User not found"
        }

    db_file = db.query(FileModel).filter(
        FileModel.filename == file_name,
        FileModel.user_id == db_user.id
    ).first()

    if db_file is None:
        return {
            "message": "File not found or access denied"
        }

    # Delete from AWS
    delete_file(db_file.stored_filename)

    # Reduce user's used storage
    db_user.storage_used -= db_file.file_size

    # Delete metadata
    db.delete(db_file)
    db.commit()

    return {
        "message": "File deleted successfully"
    }