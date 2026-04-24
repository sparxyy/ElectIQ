from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from routers import chat

load_dotenv()

app = FastAPI(title="ElectIQ API", version="1.0.0")

# CORS Configuration
origins = [
    os.getenv("FRONTEND_ORIGIN", "http://localhost:5173"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse
import os

app.include_router(chat.router)

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "version": "1.0.0"}

# Serve static assets (JS, CSS, images) explicitly
assets_dir = os.path.join(os.path.dirname(__file__), "../frontend/dist/assets")
if os.path.isdir(assets_dir):
    app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

# Catch-all route for serving the SPA index.html or root files
@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    frontend_dir = os.path.join(os.path.dirname(__file__), "../frontend/dist")
    
    # If it's an API request that wasn't matched, return 404 JSON instead of index.html
    if full_path.startswith("api/"):
        return {"detail": "Not Found"}

    # If asking for a specific file (e.g. robots.txt, favicon.ico) in dist root
    file_path = os.path.join(frontend_dir, full_path)
    if os.path.isfile(file_path):
        return FileResponse(file_path)

    # Fallback to index.html for client-side routing
    index_path = os.path.join(frontend_dir, "index.html")
    if os.path.isfile(index_path):
        return FileResponse(index_path)

    return HTMLResponse("Frontend not built. Run 'npm run build' in the frontend directory.", status_code=404)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
