from fastapi import FastAPI

app = FastAPI()
@app.get("/")
def home():
    return{"message": "Cloud Storage API is running"}