from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.core.security import decode_token
from app.models.user import User, UserRole

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    token = credentials.credentials
    try:
        payload = decode_token(token)
        user_id: int = payload.get("sub")
        token_type: str = payload.get("type")
        
        if user_id is None or token_type != "access":
            raise HTTPException(status_code=401, detail="توكن غير صالح")
            
    except JWTError:
        raise HTTPException(status_code=401, detail="فشل التحقق من التوكن")
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=401, detail="المستخدم غير موجود")
    if not user.is_active:
        raise HTTPException(status_code=401, detail="الحساب معطل")
    
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)) -> User:
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="حساب غير نشط")
    return current_user

async def get_current_government_user(current_user: User = Depends(get_current_active_user)) -> User:
    if current_user.role not in [UserRole.GOVERNMENT, UserRole.ADMIN]:
        raise HTTPException(status_code=403, detail="مطلوب صلاحيات حكومية")
    return current_user

async def get_current_admin_user(current_user: User = Depends(get_current_active_user)) -> User:
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="مطلوب صلاحيات مدير")
    return current_user