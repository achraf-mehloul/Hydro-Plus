from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
from app.database.session import get_db
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse, RefreshTokenRequest
from app.core.security import hash_password, verify_password, create_access_token, create_refresh_token, decode_token
from app.models.user import User, UserRole
from app.dependencies.auth import get_current_user

router = APIRouter()

@router.post("/register", response_model=TokenResponse)
async def register(request: RegisterRequest, db: Session = Depends(get_db)):
    if not request.email and not request.phone:
        raise HTTPException(status_code=400, detail="يجب توفير إما بريد إلكتروني أو رقم هاتف")
    
    if request.email:
        existing_email = db.query(User).filter(User.email == request.email).first()
        if existing_email:
            raise HTTPException(status_code=400, detail="البريد الإلكتروني مسجل مسبقاً")
    
    if request.phone:
        existing_phone = db.query(User).filter(User.phone == request.phone).first()
        if existing_phone:
            raise HTTPException(status_code=400, detail="رقم الهاتف مسجل مسبقاً")
    
    existing_name = db.query(User).filter(User.full_name == request.full_name).first()
    if existing_name:
        raise HTTPException(status_code=400, detail="الاسم الكامل مسجل مسبقاً")
    
    user = User(
        email=request.email,
        full_name=request.full_name,
        hashed_password=hash_password(request.password),
        phone=request.phone,
        wilaya=request.wilaya,
        commune=request.commune,
        role=UserRole.CITIZEN,
        is_verified=True
    )
    
    db.add(user)
    db.commit()
    db.refresh(user)
    
    access_token = create_access_token({"sub": str(user.id)})
    refresh_token = create_refresh_token({"sub": str(user.id)})
    
    user.refresh_token = refresh_token
    db.commit()
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(
        (User.email == request.email_or_phone) | 
        (User.phone == request.email_or_phone)
    ).first()
    
    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="رقم الهاتف/البريد الإلكتروني أو كلمة المرور غير صحيحة")
    
    if not user.is_active:
        raise HTTPException(status_code=401, detail="الحساب معطل")
    
    user.last_login = datetime.now()
    
    access_token = create_access_token({"sub": str(user.id)})
    refresh_token = create_refresh_token({"sub": str(user.id)})
    
    user.refresh_token = refresh_token
    db.commit()
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(request: RefreshTokenRequest, db: Session = Depends(get_db)):
    try:
        payload = decode_token(request.refresh_token)
        user_id = payload.get("sub")
        token_type = payload.get("type")
        
        if not user_id or token_type != "refresh":
            raise HTTPException(status_code=401, detail="توكن غير صالح")
        
        user = db.query(User).filter(User.id == int(user_id)).first()
        if not user or user.refresh_token != request.refresh_token:
            raise HTTPException(status_code=401, detail="توكن غير صالح")
        
        access_token = create_access_token({"sub": str(user.id)})
        refresh_token = create_refresh_token({"sub": str(user.id)})
        
        user.refresh_token = refresh_token
        db.commit()
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }
    except:
        raise HTTPException(status_code=401, detail="توكن غير صالح")

@router.post("/logout")
async def logout():
    return {"message": "تم تسجيل الخروج بنجاح"}

@router.get("/me")
async def get_current_user_info(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "phone": current_user.phone,
        "wilaya": current_user.wilaya,
        "commune": current_user.commune,
        "role": current_user.role,
        "is_verified": current_user.is_verified
    }

@router.post("/check-email")
async def check_email(email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    return {"exists": user is not None}

@router.post("/check-phone")
async def check_phone(phone: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.phone == phone).first()
    return {"exists": user is not None}

@router.post("/check-username")
async def check_username(full_name: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.full_name == full_name).first()
    return {"exists": user is not None}