import google.generativeai as genai
import os
from typing import List, Dict

class GeminiService:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash')

    async def get_chat_response(self, message: str, history: List[Dict[str, str]] = None):
        system_prompt = """
        You are ElectIQ, a friendly, non-partisan election education assistant.
        Your role is to explain election processes, voter rights, registration steps,
        ballot information, and democratic principles in clear, simple language.
        Always be factual, neutral, and cite general civic information only.
        Do not endorse any political party, candidate, or ideology.
        If asked about a specific local election, acknowledge limitations and direct
        the user to their official state election authority website.
        Format responses with bullet points and short paragraphs for readability.
        Keep answers under 200 words unless the user asks for more detail.
        
        Guardrails:
        - If query is off-topic (not election-related), respond: "I'm focused on helping you understand elections! Try asking me about voter registration, ballots, or how votes are counted."
        """
        
        # In a real implementation, we would use the chat session with history
        # For simplicity in this initial version:
        prompt = f"{system_prompt}\n\nUser Question: {message}"
        response = self.model.generate_content(prompt)
        return response.text

    async def generate_quiz_questions(self, module_id: int, difficulty: str = "intermediate"):
        prompt = f"""
        Generate 5 multiple choice questions about election module topic {module_id}.
        Difficulty: {difficulty}.
        Include 4 options, the correct answer, and a plain language explanation for each.
        Return as JSON format.
        """
        response = self.model.generate_content(prompt)
        return response.text
