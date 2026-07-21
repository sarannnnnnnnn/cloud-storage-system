from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User
from app.models.notification import Notification
from app.utils.jwt_handler import verify_access_token

router = APIRouter()

security = HTTPBearer()


# -----------------------------------
# Get Notifications
# -----------------------------------
@router.get("/notifications")
async def get_notifications(
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

    notifications = (
        db.query(Notification)
        .filter(Notification.user_id == db_user.id)
        .order_by(Notification.created_at.desc())
        .all()
    )

    return notifications


# -----------------------------------
# Mark Notification as Read
# -----------------------------------
@router.patch("/notifications/read/{notification_id}")
async def mark_as_read(
    notification_id: int,
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

    notification = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.user_id == db_user.id
    ).first()

    if notification is None:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    notification.is_read = True

    db.commit()

    return {
        "message": "Notification marked as read"
    }


# -----------------------------------
# Clear All Notifications
# -----------------------------------
@router.delete("/notifications/clear")
async def clear_notifications(
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

    db.query(Notification).filter(
        Notification.user_id == db_user.id
    ).delete()

    db.commit()

    return {
        "message": "All notifications cleared"
    }