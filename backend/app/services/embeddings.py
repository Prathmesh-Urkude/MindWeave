import os
from sentence_transformers import SentenceTransformer
import google.generativeai as genai

LOCAL_MODEL_PATH = os.getenv("LOCAL_EMBED_MODEL", "sentence-transformers/all-mpnet-base-v2")
embedder = SentenceTransformer(LOCAL_MODEL_PATH)

EMBED_DIM = embedder.get_sentence_embedding_dimension()
print(f"Using local embedding model: {LOCAL_MODEL_PATH} (dim={EMBED_DIM})")

def embed_texts(texts, task_type="retrieval_document"):
    """
    Embed a list of texts using a local model and return their vectors.
    Produces 768-dimensional embeddings.
    """
    embeddings = embedder.encode(texts, convert_to_numpy=True)
    return embeddings.tolist()


# --- Gemini for text generation ---
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
else:
    print("Warning: GEMINI_API_KEY not found — generation will not work.")

def answer_with_context(prompt, context, temperature=0.2, model="models/gemini-2.5-flash"):
    """
    Ask Gemini a question with retrieved context.
    """
    sys = (
        "You are a helpful study assistant. Answer ONLY from the provided context. "
        "If the answer cannot be found, say 'I couldn’t find this in your notes.' "
        "Cite the chunk numbers if helpful."
    )

    full_prompt = (
        f"{sys}\n\n"
        f"### Context\n{context}\n\n"
        f"### Question\n{prompt}\n\n"
        f"### Instructions\n- Keep it accurate.\n- Prefer bullet points.\n"
    )

    model_obj = genai.GenerativeModel(model)
    r = model_obj.generate_content(full_prompt, generation_config={"temperature": temperature})
    return r.text or ""
