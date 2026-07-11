from fastapi import FastAPI
from app.config.logger import logger
from app.config.settings import APP_NAME, APP_VERSION, DEBUG

app = FastAPI (
    title=APP_NAME,
    version=APP_VERSION,
    debug=DEBUG
)
logger.info("Cloud Storage API Started Successfully")

@app.get("/health")
def health():
    return {
        "status": "OK",
        "message": "Cloud Storage API is healthy"
    }