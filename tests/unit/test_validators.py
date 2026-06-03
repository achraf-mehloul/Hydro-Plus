import pytest
from app.utils.validators import validate_password_strength, validate_email_format

class TestValidators:
    
    def test_valid_password(self):
        is_valid, message = validate_password_strength("StrongP@ss123")
        assert is_valid == True
        assert message is None
    
    def test_weak_password_too_short(self):
        is_valid, message = validate_password_strength("Weak1!")
        assert is_valid == False
        assert "8 characters" in message
    
    def test_weak_password_no_uppercase(self):
        is_valid, message = validate_password_strength("weakpass123!")
        assert is_valid == False
        assert "uppercase" in message
    
    def test_weak_password_no_lowercase(self):
        is_valid, message = validate_password_strength("WEAKPASS123!")
        assert is_valid == False
        assert "lowercase" in message
    
    def test_weak_password_no_number(self):
        is_valid, message = validate_password_strength("WeakPass!")
        assert is_valid == False
        assert "number" in message
    
    def test_weak_password_no_special(self):
        is_valid, message = validate_password_strength("WeakPass123")
        assert is_valid == False
        assert "special" in message
    
    def test_valid_email_format(self):
        assert validate_email_format("test@example.com") == True
        assert validate_email_format("user.name@domain.co") == True
    
    def test_invalid_email_format(self):
        assert validate_email_format("test@") == False
        assert validate_email_format("test.com") == False
        assert validate_email_format("test@.com") == False
        assert validate_email_format("") == False