from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    full_name: str
    phone: Optional[str] = None
    wilaya: Optional[str] = None
    commune: Optional[str] = None
    role: Optional[str] = "citizen"

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    wilaya: Optional[str] = None
    commune: Optional[str] = None
    avatar_url: Optional[str] = None

class UserResponse(UserBase):
    id: int
    avatar_url: Optional[str] = None
    is_active: bool
    is_verified: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserProfileResponse(BaseModel):
    id: int
    email: Optional[EmailStr] = None
    full_name: str
    phone: Optional[str]
    wilaya: Optional[str]
    commune: Optional[str]
    role: str
    avatar_url: Optional[str] = None
    is_verified: bool
    created_at: datetime