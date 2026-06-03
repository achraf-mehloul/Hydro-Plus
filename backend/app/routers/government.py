from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database.session import get_db
from app.dependencies.auth import get_current_government_user
from app.dependencies.rls import filter_reports_by_user
from app.models.user import User
from app.models.report import Report, ReportStatus
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class ReportStatusUpdate(BaseModel):
    status: str
    resolution_notes: Optional[str] = None

@router.get("/dashboard")
async def get_government_dashboard(
    current_user: User = Depends(get_current_government_user),
    db: Session = Depends(get_db)
):
    """Get statistics for government user's wilaya"""
    reports_query = filter_reports_by_user(db, current_user)
    
    total_reports = reports_query.count()
    pending = reports_query.filter(Report.status == ReportStatus.PENDING).count()
    in_progress = reports_query.filter(Report.status == ReportStatus.IN_PROGRESS).count()
    resolved = reports_query.filter(Report.status == ReportStatus.RESOLVED).count()
    
    recent_reports = reports_query.order_by(Report.created_at.desc()).limit(10).all()
    
    return {
        "wilaya": current_user.wilaya,
        "statistics": {
            "total": total_reports,
            "pending": pending,
            "in_progress": in_progress,
            "resolved": resolved
        },
        "recent_reports": recent_reports
    }

@router.put("/reports/{report_id}/status")
async def update_report_status(
    report_id: int,
    update: ReportStatusUpdate,
    current_user: User = Depends(get_current_government_user),
    db: Session = Depends(get_db)
):
    """Government user updates report status"""
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    # Check if report belongs to government user's wilaya
    if report.wilaya != current_user.wilaya:
        raise HTTPException(status_code=403, detail="Access denied: not your wilaya")
    
    report.status = update.status
    if update.resolution_notes:
        report.resolution_notes = update.resolution_notes
    if update.status == ReportStatus.RESOLVED:
        report.resolved_at = datetime.now()
    
    report.assigned_to = current_user.id
    db.commit()
    
    return {"message": "Report status updated", "report_id": report_id}

@router.get("/reports")
async def get_government_reports(
    status: Optional[str] = None,
    current_user: User = Depends(get_current_government_user),
    db: Session = Depends(get_db)
):
    """Get all reports in government user's wilaya"""
    query = filter_reports_by_user(db, current_user)
    
    if status:
        query = query.filter(Report.status == status)
    
    reports = query.order_by(Report.created_at.desc()).all()
    return reports