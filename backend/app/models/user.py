from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from sqlalchemy.sql import func
from app.database.session import Base
import enum

class UserRole(str, enum.Enum):
    CITIZEN = "citizen"
    GOVERNMENT = "government"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=True)
    full_name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    phone = Column(String(50), unique=True, nullable=True)
    wilaya = Column(String(100), nullable=True)
    commune = Column(String(100), nullable=True)
    role = Column(Enum(UserRole), default=UserRole.CITIZEN)
    avatar_url = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    refresh_token = Column(String(500), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_login = Column(DateTime(timezone=True), nullable=True)