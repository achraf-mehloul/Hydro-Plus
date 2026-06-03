import pytest
import requests

BASE_URL = "http://localhost:8000"

class TestXSS:
    
    def setup_method(self):
        self.xss_payloads = [
            "<script>alert('XSS')</script>",
            "<img src=x onerror=alert('XSS')>",
            "javascript:alert('XSS')",
            "<svg onload=alert('XSS')>",
            "<body onload=alert('XSS')>",
            "><script>alert('XSS')</script>",
            "\"><script>alert('XSS')</script>",
            "';alert(String.fromCharCode(88,83,83))//",
        ]
    
    def test_register_xss(self):
        for payload in self.xss_payloads:
            response = requests.post(
                f"{BASE_URL}/api/auth/register",
                json={
                    "email": f"test{self.xss_payloads.index(payload)}@test.com",
                    "full_name": payload,
                    "password": "test123",
                    "phone": f"05551234{self.xss_payloads.index(payload)}"
                }
            )
            assert response.status_code != 200, f"XSS in full_name with: {payload}"
    
    def test_create_report_xss(self, auth_token):
        headers = {"Authorization": f"Bearer {auth_token}"}
        for payload in self.xss_payloads[:3]:
            response = requests.post(
                f"{BASE_URL}/api/reports",
                headers=headers,
                json={
                    "title": payload,
                    "description": "Test description",
                    "type": "leak"
                }
            )
            assert response.status_code != 200, f"XSS in report title with: {payload}"