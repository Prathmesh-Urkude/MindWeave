from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer

from app.core.security import verify_token
from app.services.retriever import query_chunks
from app.services.embeddings import answer_with_context

router = APIRouter(prefix="/ask", tags=["Ask"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

@router.post("/")
async def ask_question(body: dict, token: str = Depends(oauth2_scheme)):
    user_data = verify_token(token)
    user_id = user_data.get("sub")
    
    question = body.get("question", "").strip()
    top_k = int(body.get("top_k", 6))

    if not question:
        raise HTTPException(status_code=400, detail="Question is required")

    result = query_chunks(user_id, question, top_k=top_k)
    matches = result.get("matches", [])

    if not matches:
        return JSONResponse({
            "answer": "I couldn’t find this in your notes.",
            "context_used": [],
        })

    context_blocks = []
    for m in matches:
        meta = m["metadata"]
        snippet = meta.get("text", "")
        context_blocks.append(
            f"[chunk {meta.get('chunk_id')} from {meta.get('filename')}] {snippet}"
        )

    context_str = "\n\n".join(context_blocks)
    answer = answer_with_context(question, context_str, temperature=0.2)

    citations = [{
        "doc_id": m["metadata"].get("doc_id"),
        "filename": m["metadata"].get("filename"),
        "chunk_id": m["metadata"].get("chunk_id"),
        "score": m.get("score")
    } for m in matches]

    return JSONResponse({
        "answer": answer,
        "context_used": citations
    })
