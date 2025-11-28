import os
import google.generativeai as genai

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
EMBED_MODEL = os.getenv("EMBED_MODEL", "models/embedding-001")
EMBED_DIM = int(os.getenv("EMBED_DIM", "768"))

# Configure Gemini
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
else:
    print("Warning: GEMINI_API_KEY not found — embedding and generation will not work.")


def embed_texts(texts, task_type="retrieval_document"):
    """
    Embed a list of texts and return their vectors.
    task_type: 'retrieval_document' for chunks, 'retrieval_query' for user queries.
    """
    embeddings = []
    for t in texts:
        resp = genai.embed_content(
            model=EMBED_MODEL,
            content=t,
            task_type=task_type,
            output_dimensionality=EMBED_DIM,
        )
        embeddings.append(resp["embedding"])  # resp is a dict with "embedding" key
    return embeddings


def answer_with_context(prompt, context, temperature=0.2, model="models/gemini-2.5-flash"):
    """
    Ask Gemini a question with retrieved context (education, research, legal, medical).
    Ensures well-structured and frontend-friendly output.
    """
    sys = (
        "You are a highly accurate AI assistant that specializes in educational, "
        "research, legal, and medical knowledge. You must answer ONLY from the "
        "provided context. If information is missing in the context, respond with "
        "'I couldn’t find this in your notes.' "
        "Do NOT hallucinate. Make sure the response is detailed, concise, and factual. "
        "Use a professional tone.\n\n"
        "Formatting Rules:\n"
        "• Always start with a bold heading summarizing the topic.\n"
        "• Use bullet points, numbered lists, and short paragraphs.\n"
        "• Highlight important keywords in **bold**.\n"
        "• Provide structured output with these sections when possible:\n"
        "  - **Overview**\n"
        "  - **Key Points / Features / Symptoms / Concepts**\n"
        "  - **Examples / Use Cases**\n"
        "  - **Conclusion**\n"
        "• If context contains chunk references, cite using (Chunk X)."
    )

    full_prompt = (
        f"{sys}\n\n"
        f"### Context:\n{context}\n\n"
        f"### User Question:\n{prompt}\n\n"
        f"### Instructions:\n"
        "- Follow the formatting rules above.\n"
        "- Keep the response highly relevant to the context.\n"
        "- Avoid generic or unrelated information.\n"
    )

    model_obj = genai.GenerativeModel(model)
    r = model_obj.generate_content(
        full_prompt,
        generation_config={"temperature": temperature},
    )
    return r.text or ""

