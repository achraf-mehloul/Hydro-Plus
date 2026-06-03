import pytest
from waf.custom_waf.waf_middleware import CustomWAFMiddleware

class TestWAF:
    
    def setup_method(self):
        self.waf = CustomWAFMiddleware(None)
    
    def test_sqli_detection(self):
        sqli_payloads = [
            "' OR '1'='1",
            "1; DROP TABLE users",
            "UNION SELECT * FROM users",
            "admin' --",
        ]
        
        for payload in sqli_payloads:
            is_attack, attack_type = self.waf.check_payload(payload)
            assert is_attack == True
            assert attack_type == "SQL Injection"
    
    def test_xss_detection(self):
        xss_payloads = [
            "<script>alert(1)</script>",
            "<img src=x onerror=alert(1)>",
            "javascript:alert(1)",
        ]
        
        for payload in xss_payloads:
            is_attack, attack_type = self.waf.check_payload(payload)
            assert is_attack == True
            assert attack_type == "XSS Attack"
    
    def test_path_traversal_detection(self):
        path_payloads = [
            "../../../etc/passwd",
            "..\\..\\windows\\win.ini",
            "%2e%2e%2f%2e%2e%2f",
        ]
        
        for payload in path_payloads:
            is_attack, attack_type = self.waf.check_payload(payload)
            assert is_attack == True
            assert attack_type == "Path Traversal"
    
    def test_safe_payloads(self):
        safe_payloads = [
            "Hello world",
            "This is a normal text",
            "user@example.com",
            "123456789",
        ]
        
        for payload in safe_payloads:
            is_attack, _ = self.waf.check_payload(payload)
            assert is_attack == False