from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.utils.security import hash_password, verify_password
from app.utils.jwt_handler import create_access_token, verify_access_token

router = APIRouter()
security = HTTPBearer()


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    hashed_password = hash_password(user.password)

    new_user = User(
        username=user.username,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    # Search user by email
    db_user = db.query(User).filter(User.email == user.email).first()

    # Email not found
    if not db_user:
        return {
            "message": "Invalid email or password"
        }

    # Password is incorrect
    if not verify_password(user.password, db_user.password):
        return {
            "message": "Invalid email or password"
        }

    # Create JWT Token
    access_token = create_access_token(
        data={"sub": db_user.email}
    )

    # Return JWT Token
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.get("/profile")
def profile(credentials: HTTPAuthorizationCredentials = Depends(security)):

    token = credentials.credentials

    payload = verify_access_token(token)

    if payload is None:
        return {
            "message": "Invalid Token"
        }

    return {
        "message": "Protected Route",
        "user": payload["sub"]
    }