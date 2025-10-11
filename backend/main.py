from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth_routes import auth_router
from app.routes.upload_routes import router as upload_router

app = FastAPI(title="MindWeave API", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(upload_router)

@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "MindWeave API is running smoothly 🚀"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=5055, reload=True)
