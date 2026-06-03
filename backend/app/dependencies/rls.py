from sqlalchemy.orm import Session
from app.models.user import User, UserRole
from app.models.report import Report
from fastapi import HTTPException, status

def filter_reports_by_user(db: Session, current_user: User):
    """RLS: Return reports based on user role"""
    if current_user.role == UserRole.ADMIN:
        return db.query(Report)
    elif current_user.role == UserRole.GOVERNMENT:
        # Government users see reports from their wilaya
        return db.query(Report).filter(Report.wilaya == current_user.wilaya)
    else:
        # Citizens see only their own reports
        return db.query(Report).filter(Report.user_id == current_user.id)

def check_report_access(db: Session, report_id: int, current_user: User) -> Report:
    """Check if user has access to a specific report"""
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    if current_user.role == UserRole.ADMIN:
        return report
    elif current_user.role == UserRole.GOVERNMENT:
        if report.wilaya != current_user.wilaya:
            raise HTTPException(status_code=403, detail="Access denied: wrong wilaya")
        return report
    else:
        if report.user_id != current_user.id:
            raise HTTPException(status_code=403, detail="Access denied: not your report")
        return report