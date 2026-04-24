from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from services.gemini_service import GeminiService

router = APIRouter(prefix="/api/chat", tags=["chat"])
gemini_service = GeminiService()

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = None
    language: str = "en"

class ChatResponse(BaseModel):
    reply: str
    sources: List[str] = []
    language: str

@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        reply = await gemini_service.get_chat_response(request.message)
        return ChatResponse(
            reply=reply,
            sources=["https://vote.gov"], # Default source for now
            language=request.language
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
