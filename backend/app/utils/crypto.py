import secrets
import hashlib
from cryptography.fernet import Fernet

def generate_api_key() -> str:
    return secrets.token_urlsafe(32)

def hash_string(text: str) -> str:
    return hashlib.sha256(text.encode()).hexdigest()

def generate_encryption_key() -> bytes:
    return Fernet.generate_key()