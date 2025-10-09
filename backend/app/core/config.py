import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "MindWeave API"
    VERSION: str = "2.0"
    MONGO_URI: str = os.getenv("MONGO_URI")
    JWT_SECRET: str = os.getenv("JWT_SECRET")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    UPLOAD_DIR: str = os.path.join(os.path.dirname(__file__), "../../data/uploads")

settings = Settings()
