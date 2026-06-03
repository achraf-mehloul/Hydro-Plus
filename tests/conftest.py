import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.database.session import Base, get_db

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture
def client():
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as test_client:
        yield test_client
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def auth_token(client):
    client.post("/api/auth/register", json={
        "email": "test@example.com",
        "full_name": "Test User",
        "password": "Test123!",
        "phone": "0555123456"
    })
    response = client.post("/api/auth/login", json={
        "email_or_phone": "test@example.com",
        "password": "Test123!"
    })
    return response.json().get("access_token")