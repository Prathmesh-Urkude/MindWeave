from pymongo import MongoClient
from app.core.config import settings

client = MongoClient(settings.MONGO_URI)
db = client["mindweave"]

users_collection = db["users"]
documents_collection = db["documents"]
