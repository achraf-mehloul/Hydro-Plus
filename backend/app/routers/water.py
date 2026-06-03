from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
from app.database.session import get_db
from app.dependencies.auth import get_current_active_user, get_current_government_user
from app.models.user import User
from app.models.water_reading import WaterReading
from pydantic import BaseModel

router = APIRouter()

class WaterReadingCreate(BaseModel):
    reading_value: float
    location_lat: Optional[float] = None
    location_lng: Optional[float] = None
    notes: Optional[str] = None
    unit: str = "m³"

class WaterReadingResponse(WaterReadingCreate):
    id: int
    user_id: int
    reading_date: datetime
    
    class Config:
        from_attributes = True

@router.post("/readings", response_model=WaterReadingResponse)
async def add_water_reading(
    reading: WaterReadingCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    new_reading = WaterReading(
        **reading.dict(),
        user_id=current_user.id
    )
    db.add(new_reading)
    db.commit()
    db.refresh(new_reading)
    return new_reading

@router.get("/readings", response_model=List[WaterReadingResponse])
async def get_water_readings(
    days: int = 30,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    since_date = datetime.now() - timedelta(days=days)
    readings = db.query(WaterReading).filter(
        WaterReading.user_id == current_user.id,
        WaterReading.reading_date >= since_date
    ).order_by(WaterReading.reading_date.desc()).all()
    return readings

@router.get("/statistics")
async def get_water_statistics(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get water usage statistics for the user"""
    last_30_days = datetime.now() - timedelta(days=30)
    readings = db.query(WaterReading).filter(
        WaterReading.user_id == current_user.id,
        WaterReading.reading_date >= last_30_days
    ).all()
    
    if not readings:
        return {"average": 0, "total": 0, "trend": "stable"}
    
    total = sum(r.reading_value for r in readings)
    average = total / len(readings)
    
    return {
        "average": round(average, 2),
        "total": round(total, 2),
        "readings_count": len(readings)
    }