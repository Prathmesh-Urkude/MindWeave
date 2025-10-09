from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer
from app.core.security import decode_token

class AuthMiddleware(HTTPBearer):
    async def __call__(self, request: Request):
        auth = await super().__call__(request)
        token = auth.credentials
        payload = decode_token(token)
        if not payload:
            raise HTTPException(status_code=403, detail="Invalid or expired token")
        request.state.user = payload
        return payload
