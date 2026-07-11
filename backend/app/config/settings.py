from dotenv import load_dotenv
import os

os.getenv("APP_NAME")
load_dotenv()

APP_NAME = os.getenv("APP_NAME")
APP_VERSION = os.getenv("APP_VERSION")
DEBUG = os.getenv("DEBUG")