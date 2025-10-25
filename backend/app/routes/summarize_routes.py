from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer

from app.core.security import verify_token
from app.services.retriever import query_chunks
from app.services.embeddings import answer_with_context

router = APIRouter(prefix="/summarize", tags=["Summarize"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

@router.post("/")
async def summarize_notes(body: dict, token: str = Depends(oauth2_scheme)):
    """
    Summarize user notes contextually based on topic and domain.
    Domains supported: academic, education, medical, law/legal.
    """
    user_data = verify_token(token)
    user_id = user_data.get("sub")

    topic = body.get("topic", "").strip()
    domain = body.get("domain", "academic").lower().strip()
    top_k = int(body.get("top_k", 12))

    if not topic:
        raise HTTPException(status_code=400, detail="Topic is required")

    result = query_chunks(user_id, topic, top_k=top_k)
    matches = result.get("matches", [])

    if not matches:
        return JSONResponse({"summary": "No relevant notes found to summarize."})

    parts = []
    for m in matches:
        meta = m["metadata"]
        parts.append(
            f"[chunk {meta.get('chunk_id')} from {meta.get('filename')}] {meta.get('text','')}"
        )
    ctx = "\n\n".join(parts)

    # Domain-specific summarization prompt
    domain_prompts = {
        "academic": (
            "Summarize the topic in an academic tone, highlighting key theories, "
            "concepts, and research findings. Structure the summary with bullet points "
            "and short explanations suitable for revision."
        ),
        "education": (
            "Summarize in a student-friendly manner with clear points, definitions, "
            "and examples to aid understanding for exam preparation or classroom use."
        ),
        "medical": (
            "Summarize using medical terminology. Include definitions, symptoms, causes, "
            "diagnosis methods, and treatment approaches where relevant."
        ),
        "law": (
            "Summarize in a legal context. Include case references, key principles, "
            "statutory interpretations, and important legal precedents where applicable."
        ),
        "legal": (
            "Summarize in a law-oriented format similar to legal briefs — focusing on "
            "case facts, rulings, and relevant legal doctrines."
        ),
    }

    domain_instruction = domain_prompts.get(domain, domain_prompts["academic"])

    prompt = (
        f"Topic: {topic}\n"
        f"Domain: {domain.capitalize()}\n\n"
        f"{domain_instruction}\n\n"
        f"Use ONLY the context below to produce a concise, accurate summary:\n\n"
        f"{ctx}"
    )

    summary = answer_with_context(prompt, ctx, temperature=0.2)

    return JSONResponse({
        "topic": topic,
        "domain": domain,
        "summary": summary if summary and summary.strip() else "No summary generated. Please refine topic or domain."
    })
