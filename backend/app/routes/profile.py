from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User
from app.utils.jwt_handler import verify_access_token

router = APIRouter(prefix="/profile", tags=["Profile"])

security = HTTPBearer()


@router.post("/upgrade-storage")
def upgrade_storage(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    token = credentials.credentials

    payload = verify_access_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Token",
        )

    user = (
        db.query(User)
        .filter(User.email == payload["sub"])
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    if user.extra_storage:
        return {
            "message": "Extra storage already activated.",
            "user": {
                "id": user.id,
                "name": user.username,
                "email": user.email,
                "storage_used": user.storage_used,
                "storage_limit": user.storage_limit,
                "extra_storage": user.extra_storage,
            },
        }

    user.storage_limit = 10737418240  # 10 GB
    user.extra_storage = True

    db.commit()
    db.refresh(user)

    return {
        "message": "Storage upgraded successfully.",
        "user": {
            "id": user.id,
            "name": user.username,
            "email": user.email,
            "storage_used": user.storage_used,
            "storage_limit": user.storage_limit,
            "extra_storage": user.extra_storage,
        },
    }