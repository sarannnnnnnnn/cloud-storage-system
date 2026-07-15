from fastapi import APIRouter, UploadFile, File
from app.services.s3_service import upload_file

router = APIRouter()


@router.post("/upload")
async def upload(file: UploadFile = File(...)):

    file_path = f"temp_{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    upload_file(file_path, file.filename)

    return {
        "message": "File uploaded successfully",
        "filename": file.filename
    }   