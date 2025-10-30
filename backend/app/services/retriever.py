from typing import Dict
from .pinecone_client import index
from .embeddings import embed_texts

def query_chunks(student_ns: str, question: str, top_k: int = 6) -> Dict:
    """
    Embed the query and search top-k relevant chunks from Pinecone.
    """
    qvec = embed_texts([question], task_type="retrieval_query")[0]

    result = index.query(
        vector=qvec,
        top_k=top_k,
        include_values=False,
        include_metadata=True,
        namespace=student_ns
    )
    return result
