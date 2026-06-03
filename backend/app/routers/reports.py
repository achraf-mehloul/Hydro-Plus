from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database.session import get_db
from app.dependencies.auth import get_current_active_user
from app.dependencies.rls import filter_reports_by_user, check_report_access
from app.schemas.report import ReportCreate, ReportUpdate, ReportResponse
from app.models.user import User
from app.models.report import Report, ReportStatus

router = APIRouter()

@router.get("/", response_model=List[ReportResponse])
async def get_reports(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get reports with RLS - users see only their authorized reports"""
    query = filter_reports_by_user(db, current_user)
    
    if status:
        query = query.filter(Report.status == status)
    
    reports = query.offset(skip).limit(limit).all()
    return reports

@router.get("/{report_id}", response_model=ReportResponse)
async def get_report(
    report_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get single report with RLS check"""
    report = check_report_access(db, report_id, current_user)
    return report

@router.post("/", response_model=ReportResponse, status_code=status.HTTP_201_CREATED)
async def create_report(
    report: ReportCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create new report - automatically assigned to current user"""
    new_report = Report(
        **report.dict(),
        user_id=current_user.id,
        wilaya=report.wilaya or current_user.wilaya,
        status=ReportStatus.PENDING
    )
    
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    
    return new_report

@router.put("/{report_id}", response_model=ReportResponse)
async def update_report(
    report_id: int,
    report_update: ReportUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update report - only owner or authorized users"""
    report = check_report_access(db, report_id, current_user)
    
    for field, value in report_update.dict(exclude_unset=True).items():
        setattr(report, field, value)
    
    db.commit()
    db.refresh(report)
    
    return report

@router.delete("/{report_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_report(
    report_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete report - only owner or admin"""
    report = check_report_access(db, report_id, current_user)
    
    # Only owner or admin can delete
    if current_user.role not in ["admin"] and report.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this report")
    
    db.delete(report)
    db.commit()