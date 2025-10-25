from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth_routes import auth_router
from app.routes.upload_routes import router as upload_router
from app.routes.ask_routes import router as ask_router
from app.routes.summarize_routes import router as summarize_router
from app.routes.flashcard_routes import router as flashcard_router

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
app.include_router(ask_router)
app.include_router(summarize_router)
app.include_router(flashcard_router)

@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "MindWeave API is running smoothly 🚀"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=5055, reload=True)
