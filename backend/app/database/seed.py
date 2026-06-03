from sqlalchemy.orm import Session
from app.core.security import hash_password
from app.models.user import User

def seed_database(db: Session):
    admin = db.query(User).filter(User.email == "achraf.dev.ai@gmail.com").first()
    if not admin:
        admin = User(
            email="achraf.dev.ai@gmail.com",
            full_name="System Administrator",
            hashed_password=hash_password("admin123"),
            phone="0555123456",
            role="admin",
            wilaya="Alger",
            is_active=True,
            is_verified=True
        )
        db.add(admin)
    
    test_user = db.query(User).filter(User.email == "user@waterapp.com").first()
    if not test_user:
        test_user = User(
            email="user@waterapp.com",
            full_name="Test User",
            hashed_password=hash_password("user123"),
            phone="0777888999",
            role="citizen",
            wilaya="Alger",
            is_active=True,
            is_verified=True
        )
        db.add(test_user)
    
    db.commit()
    print("✅ Database seeded successfully!")