# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router  
from contextlib import asynccontextmanager
from app.config import settings
from app.services.model_loader import ml_models
from app.api.medicine_routes import router as medicine_router
import logging

logging.basicConfig(level=logging.INFO)

@asynccontextmanager
async def lifespan(app: FastAPI):
    ml_models.load_models()
    yield
    ml_models.xgb_model = None
    ml_models.image_model = None

def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        description=settings.DESCRIPTION,
        lifespan=lifespan
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"], 
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api_router, prefix="/api")
    app.include_router(medicine_router, prefix="/api")

    @app.get("/health", tags=["System"])
    async def health_check():
        return {
            "status": "healthy",
            "models_loaded": ml_models.xgb_model is not None        }

    return app

app = create_app()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)