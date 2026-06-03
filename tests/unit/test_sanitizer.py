import pytest
from app.utils.sanitizer import sanitize_input, sanitize_email, validate_phone

class TestSanitizer:
    
    def test_sanitize_xss_script(self):
        input_text = "<script>alert('XSS')</script>"
        result = sanitize_input(input_text)
        assert "<script>" not in result
        assert "alert" not in result
    
    def test_sanitize_xss_img(self):
        input_text = '<img src=x onerror=alert(1)>'
        result = sanitize_input(input_text)
        assert "onerror" not in result
    
    def test_sanitize_javascript(self):
        input_text = 'javascript:alert("XSS")'
        result = sanitize_input(input_text)
        assert "javascript:" not in result
    
    def test_sanitize_normal_text(self):
        input_text = "Hello World! This is normal text."
        result = sanitize_input(input_text)
        assert result == "Hello World! This is normal text."
    
    def test_sanitize_html_entities(self):
        input_text = "<b>Bold</b>"
        result = sanitize_input(input_text)
        assert "&lt;b&gt;" in result or result == "Bold"
    
    def test_sanitize_email(self):
        assert sanitize_email("  TEST@EXAMPLE.com  ") == "test@example.com"
        assert sanitize_email("User@Domain.COM") == "user@domain.com"
    
    def test_validate_algerian_phone(self):
        assert validate_phone("0555123456") == True
        assert validate_phone("+213555123456") == True
        assert validate_phone("0665123456") == True
        assert validate_phone("0777123456") == True
    
    def test_invalid_phone(self):
        assert validate_phone("123456") == False
        assert validate_phone("05551234") == False
        assert validate_phone("05551234567") == False
        assert validate_phone("0255123456") == False