from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ReportBase(BaseModel):
    title: str
    description: str
    type: str = "other"
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    address: Optional[str] = None
    wilaya: Optional[str] = None
    commune: Optional[str] = None
    image_urls: Optional[str] = None

class ReportCreate(ReportBase):
    pass

class ReportUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    resolution_notes: Optional[str] = None

class ReportResponse(ReportBase):
    id: int
    user_id: int
    status: str
    assigned_to: Optional[int]
    resolution_notes: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]
    resolved_at: Optional[datetime]
    
    class Config:
        from_attributes = True