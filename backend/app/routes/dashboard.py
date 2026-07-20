from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User
from app.models.file import File as FileModel
from app.utils.jwt_handler import verify_access_token

router = APIRouter()

security = HTTPBearer()


@router.get("/dashboard")
async def dashboard(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    token = credentials.credentials

    payload = verify_access_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Token"
        )

    email = payload["sub"]

    db_user = db.query(User).filter(
        User.email == email
    ).first()

    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    total_files = db.query(FileModel).filter(
        FileModel.user_id == db_user.id
    ).count()

    recent_files = (
        db.query(FileModel)
        .filter(FileModel.user_id == db_user.id)
        .order_by(FileModel.id.desc())
        .limit(5)
        .all()
    )

    return {
        "username": db_user.username,
        "email": db_user.email,
        "storage_used": db_user.storage_used,
        "storage_limit": db_user.storage_limit,
        "total_files": total_files,
        "recent_files": recent_files
    }