from sqlalchemy import Column, Integer, String, Float, DateTime, Text, ForeignKey, Enum
from sqlalchemy.sql import func
from app.database.session import Base
import enum

class ReportStatus(str, enum.Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"
    REJECTED = "rejected"

class ReportType(str, enum.Enum):
    LEAK = "leak"
    POLLUTION = "pollution"
    OUTAGE = "outage"
    PRESSURE = "pressure"
    OTHER = "other"

class Report(Base):
    __tablename__ = "reports"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    type = Column(Enum(ReportType), default=ReportType.OTHER)
    status = Column(Enum(ReportStatus), default=ReportStatus.PENDING)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    address = Column(String(500), nullable=True)
    wilaya = Column(String(100), nullable=True)
    commune = Column(String(100), nullable=True)
    image_urls = Column(Text, nullable=True)  # JSON string
    assigned_to = Column(Integer, ForeignKey("users.id"), nullable=True)
    resolution_notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    resolved_at = Column(DateTime(timezone=True), nullable=True)