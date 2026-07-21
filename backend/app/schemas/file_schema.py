from pydantic import BaseModel

class RenameFileRequest(BaseModel):
    new_name: str