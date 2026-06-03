import re
import html

def sanitize_input(text: str) -> str:
    """Sanitize user input to prevent XSS"""
    if not text:
        return text
    
    # Escape HTML
    text = html.escape(text)
    
    # Remove any remaining script tags
    text = re.sub(r'<script.*?>.*?</script>', '', text, flags=re.IGNORECASE)
    text = re.sub(r'javascript:', '', text, flags=re.IGNORECASE)
    text = re.sub(r'on\w+\s*=', '', text, flags=re.IGNORECASE)
    
    return text

def sanitize_email(email: str) -> str:
    """Clean email address"""
    return email.strip().lower()

def validate_phone(phone: str) -> bool:
    """Validate Algerian phone numbers"""
    pattern = r'^(0|\+213)[5-7]\d{8}$'
    return bool(re.match(pattern, phone))