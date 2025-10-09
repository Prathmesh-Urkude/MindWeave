from fastapi import APIRouter, HTTPException
from app.database.connection import users_collection
from app.database.models.user_model import UserCreate, UserLogin
from app.core.security import hash_password, verify_password, create_access_token

auth_router = APIRouter(prefix="/auth", tags=["Auth"])

@auth_router.post("/signup")
async def signup(user: UserCreate):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_pw = hash_password(user.password)
    users_collection.insert_one({
        "name": user.name,
        "email": user.email,
        "password": hashed_pw
    })
    return {"message": "Account created successfully"}

@auth_router.post("/login")
async def login(user: UserLogin):
    db_user = users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": db_user["email"]})
    return {"access_token": token, "token_type": "bearer"}
