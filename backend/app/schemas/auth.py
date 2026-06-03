from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class LoginRequest(BaseModel):
    email_or_phone: str
    password: str

class RegisterRequest(BaseModel):
    email: Optional[EmailStr] = None
    full_name: str
    password: str
    phone: Optional[str] = Field(None, pattern=r'^(0|\+213)[5-7]\d{8}$')
    wilaya: Optional[str] = None
    commune: Optional[str] = None

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class RefreshTokenRequest(BaseModel):
    refresh_token: str

class ChangePasswordRequest(BaseModel):
    old_password: str
    new_password: str

class ForgotPasswordRequest(BaseModel):
    email_or_phone: str

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str