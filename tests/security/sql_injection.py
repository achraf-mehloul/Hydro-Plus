import pytest
import requests
import json

BASE_URL = "http://localhost:8000"

class TestSQLInjection:
    
    def setup_method(self):
        self.payloads = [
            "' OR '1'='1",
            "' OR 1=1 --",
            "admin' --",
            "' UNION SELECT NULL--",
            "' UNION SELECT username, password FROM users--",
            "1; DROP TABLE users--",
            "1' OR '1'='1' /*",
            "1' AND 1=1--",
            "1' AND 1=0--",
            "1' WAITFOR DELAY '0:0:5'--",
        ]
    
    def test_login_sql_injection(self):
        for payload in self.payloads:
            response = requests.post(
                f"{BASE_URL}/api/auth/login",
                json={"email_or_phone": payload, "password": "anything"}
            )
            assert response.status_code in [401, 403], f"SQL Injection succeeded with payload: {payload}"
    
    def test_register_sql_injection(self):
        for payload in self.payloads[:5]:
            response = requests.post(
                f"{BASE_URL}/api/auth/register",
                json={
                    "email": f"{payload}@test.com",
                    "full_name": "Test",
                    "password": "test123",
                    "phone": "0555123456"
                }
            )
            assert response.status_code not in [200, 201], f"SQL Injection in register with: {payload}"
    
    def test_reports_sql_injection(self, auth_token):
        headers = {"Authorization": f"Bearer {auth_token}"}
        for payload in self.payloads:
            response = requests.get(
                f"{BASE_URL}/api/reports?search={payload}",
                headers=headers
            )
            assert response.status_code not in [500], f"SQL Injection in reports with: {payload}"