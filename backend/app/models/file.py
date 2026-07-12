from sqlalchemy import Integer, String, Column, ForeignKey
from app.database.database import Base

class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(250), nullable=False)
    file_url = Column(String(500), nullable=False)
    file_size = Column(Integer)
    user_id = Column(Integer, ForeignKey("users.id"))