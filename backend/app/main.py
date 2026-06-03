from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.config import settings
from app.middleware.waf import WAFMiddleware
from app.middleware.rate_limit import RateLimitMiddleware
from app.middleware.security_headers import SecurityHeadersMiddleware
from app.middleware.request_logger import RequestLoggingMiddleware
from app.routers import auth, users, reports, water, notifications, government, admin
from app.database.session import engine, Base
from app.database.seed import seed_database
from app.database.session import SessionLocal
import os

Base.metadata.create_all(bind=engine)

db = SessionLocal()
try:
    seed_database(db)
finally:
    db.close()

app = FastAPI(
    title="Water App API",
    description="Water quality and leak reporting system with RLS + WAF",
    version="1.0.0"
)

os.makedirs("uploads/avatars", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:8080",
        "http://localhost:3001",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:8080",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(RateLimitMiddleware)
app.add_middleware(WAFMiddleware)
app.add_middleware(RequestLoggingMiddleware)

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(reports.router, prefix="/api/reports", tags=["Reports"])
app.include_router(water.router, prefix="/api/water", tags=["Water"])
app.include_router(notifications.router, prefix="/api/notifications", tags=["Notifications"])
app.include_router(government.router, prefix="/api/government", tags=["Government"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])

@app.get("/")
async def root():
    return {"message": "Water App API - Secured with WAF + RLS + JWT"}

@app.get("/health")
async def health():
    return {"status": "healthy", "environment": settings.ENVIRONMENT}