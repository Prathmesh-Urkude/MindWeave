import os
import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.responses import JSONResponse
from werkzeug.utils import secure_filename
from fastapi.security import OAuth2PasswordBearer

from app.core.security import verify_token
from app.services.parsers import extract_text
from app.services.text_splitter import split_text
from app.services.embeddings import embed_texts
from app.services.pinecone_client import index

router = APIRouter(prefix="/upload", tags=["Upload"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
ALLOWED_EXT = {".pdf", ".docx", ".txt", ".md"}


@router.post("/")
async def upload_file(file: UploadFile = File(...), token: str = Depends(oauth2_scheme)):
    """Upload and process files for embedding"""
    user_data = verify_token(token)
    user_id = user_data.get("sub")

    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    filename = secure_filename(file.filename)
    ext = os.path.splitext(filename)[1].lower()
    if ext not in ALLOWED_EXT:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    file_id = str(uuid.uuid4())
    saved_path = os.path.join(UPLOAD_DIR, f"{file_id}_{filename}")

    with open(saved_path, "wb") as f:
        f.write(await file.read())

    vectors_to_upsert = []
    chunk_counter = 0

    for page_text in extract_text(saved_path):
        page_chunks = split_text(page_text, chunk_size=1000, chunk_overlap=200)
        texts = [c[1] for c in page_chunks]
        vectors = embed_texts(texts, task_type="RETRIEVAL_DOCUMENT")

        for (chunk_id, text), vec in zip(page_chunks, vectors):
            vectors_to_upsert.append({
                "id": f"{file_id}-{chunk_counter}",
                "values": vec,
                "metadata": {
                    "doc_id": file_id,
                    "user_id": user_id,
                    "filename": filename,
                    "chunk_id": chunk_counter,
                    "text": text[:1200]
                }
            })
            chunk_counter += 1

    if vectors_to_upsert:
        index.upsert(vectors=vectors_to_upsert, namespace=user_id)

    return JSONResponse({
        "ok": True,
        "user_id": user_id,
        "doc_id": file_id,
        "num_chunks": chunk_counter,
        "filename": filename
    })
