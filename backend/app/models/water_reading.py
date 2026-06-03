from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey, String
from sqlalchemy.sql import func
from app.database.session import Base

class WaterReading(Base):
    __tablename__ = "water_readings"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    reading_value = Column(Float, nullable=False)
    unit = Column(String(20), default="m³")
    location_lat = Column(Float, nullable=True)
    location_lng = Column(Float, nullable=True)
    notes = Column(String(500), nullable=True)
    reading_date = Column(DateTime(timezone=True), server_default=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())