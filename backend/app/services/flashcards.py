from typing import List, Dict
from .embeddings import answer_with_context

def make_flashcards(topic: str, context_chunks: List[str], k: int = 8, domain: str = "academic") -> List[Dict]:
    """
    Prompts LLM to output concise Q/A pairs (flashcards) for revision.
    Supports domain-specific tone: academic, education, medical, law/legal.
    """
    ctx = "\n\n".join(context_chunks[:k])
    domain = domain.lower().strip()

    # Domain-specific instruction
    domain_prompts = {
        "academic": (
            "Generate flashcards focusing on key theories, principles, and definitions. "
            "Each question should test understanding of core concepts."
        ),
        "education": (
            "Generate student-friendly flashcards with clear explanations and simple wording. "
            "Include helpful examples if possible."
        ),
        "medical": (
            "Generate medical flashcards including terminology, symptoms, causes, diagnostic methods, "
            "and treatments. Ensure clinical accuracy."
        ),
        "law": (
            "Generate legal flashcards highlighting case laws, legal principles, and important statutes. "
            "Each answer should be concise but precise."
        ),
        "legal": (
            "Generate law-related flashcards focusing on definitions, key cases, judgments, and interpretations. "
            "Use formal legal language."
        ),
    }

    domain_instruction = domain_prompts.get(domain, domain_prompts["academic"])

    prompt = (
        f"Create concise flashcards on '{topic}' using ONLY the provided context.\n"
        f"{domain_instruction}\n\n"
        f"Return 6–10 Q&A pairs with short answers.\n"
        f"Format strictly as:\nQ: ...\nA: ...\n(repeat)\n\n"
        f"Context:\n{ctx}"
    )

    out = answer_with_context(prompt, ctx, temperature=0.2)

    cards = []
    for block in out.split("\n"):
        if block.startswith("Q:"):
            q = block[2:].strip()
            cards.append({"q": q, "a": ""})
        elif block.startswith("A:") and cards:
            cards[-1]["a"] = block[2:].strip()

    return [c for c in cards if c["q"] and c["a"]]
