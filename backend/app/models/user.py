from sqlalchemy import Column, Integer, String, BigInteger
from app.database.database import Base
import uuid

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)

    storage_limit = Column(BigInteger, default=5368709120)   # 5 GB
    storage_used = Column(BigInteger, default=0)
