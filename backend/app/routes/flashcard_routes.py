from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer

from app.core.security import verify_token
from app.services.retriever import query_chunks
from app.services.flashcards import make_flashcards

router = APIRouter(prefix="/flashcards", tags=["Flashcards"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


@router.post("/")
async def generate_flashcards(body: dict, token: str = Depends(oauth2_scheme)):
    user_data = verify_token(token)
    user_id = user_data.get("sub")

    topic = body.get("topic", "").strip()
    top_k = int(body.get("top_k", 8))

    if not topic:
        raise HTTPException(status_code=400, detail="Topic is required")

    res = query_chunks(user_id, topic, top_k=top_k)
    matches = res.get("matches", [])
    if not matches:
        return JSONResponse({"cards": []})

    ctx = [m["metadata"].get("text", "") for m in matches]
    cards = make_flashcards(topic, ctx, k=min(top_k, len(ctx)))
    return JSONResponse({"topic": topic, "cards": cards})
