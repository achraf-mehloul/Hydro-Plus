from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
import shutil
import os
from app.database.session import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.user import UserUpdate, UserProfileResponse

router = APIRouter()

UPLOAD_DIR = "uploads/avatars"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/profile", response_model=UserProfileResponse)
async def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/profile")
async def update_profile(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    for field, value in user_update.dict(exclude_unset=True).items():
        setattr(current_user, field, value)
    
    db.commit()
    db.refresh(current_user)
    
    return {"message": "Profile updated successfully"}

@router.post("/upload-avatar")
async def upload_avatar(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="الملف يجب أن يكون صورة")
    
    old_avatar = current_user.avatar_url
    if old_avatar:
        old_path = old_avatar.replace("/uploads/", "")
        full_old_path = os.path.join(UPLOAD_DIR, os.path.basename(old_path))
        if os.path.exists(full_old_path):
            os.remove(full_old_path)
    
    file_extension = file.filename.split(".")[-1]
    filename = f"user_{current_user.id}_{int(datetime.now().timestamp())}.{file_extension}"
    filepath = os.path.join(UPLOAD_DIR, filename)
    
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    avatar_url = f"/uploads/avatars/{filename}"
    current_user.avatar_url = avatar_url
    db.commit()
    
    return {"avatar_url": avatar_url}

@router.delete("/avatar")
async def delete_avatar(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.avatar_url:
        filepath = current_user.avatar_url.replace("/uploads/", "")
        full_path = os.path.join(UPLOAD_DIR, os.path.basename(filepath))
        if os.path.exists(full_path):
            os.remove(full_path)
    
    current_user.avatar_url = None
    db.commit()
    
    return {"message": "Avatar deleted successfully"}