from fastapi import FastAPI
from app.models.file import File
from app.models.user import User
from app.config.logger import logger
from app.database.database import engine, Base
from app.routes.file import router as file_router
from app.routes.auth import router as auth_router
from app.config.settings import APP_NAME, APP_VERSION, DEBUG

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
    debug=DEBUG
)

app.include_router(auth_router)
app.include_router(file_router)

logger.info("Cloud Storage API Started Successfully")


@app.get("/health")
def health():
    return {
        "status": "OK",
        "message": "Cloud Storage API is healthy"
    }