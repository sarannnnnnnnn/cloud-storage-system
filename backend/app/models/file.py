from sqlalchemy import Integer, String, Column, ForeignKey, Boolean
from app.database.database import Base

class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(250), nullable=False)
    stored_filename = Column(String(300), unique=True, nullable=False)
    file_url = Column(String(500), nullable=False)
    file_size = Column(Integer)
    user_id = Column(Integer, ForeignKey("users.id"))

    is_deleted = Column(Boolean, default=False)