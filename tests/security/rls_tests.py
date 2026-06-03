import pytest
import requests

BASE_URL = "http://localhost:8000"

class TestRLS:
    
    def setup_method(self):
        self.user1_token = self.get_user_token("user1@test.com", "User@123")
        self.user2_token = self.get_user_token("user2@test.com", "User@123")
    
    def get_user_token(self, email, password):
        requests.post(f"{BASE_URL}/api/auth/register", json={
            "email": email,
            "full_name": email.split('@')[0],
            "password": password,
            "phone": f"05551234{email.split('@')[0]}"
        })
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email_or_phone": email,
            "password": password
        })
        return response.json().get("access_token")
    
    def test_user_can_access_own_report(self):
        headers = {"Authorization": f"Bearer {self.user1_token}"}
        
        create_response = requests.post(
            f"{BASE_URL}/api/reports",
            headers=headers,
            json={"title": "My Report", "description": "Test", "type": "leak"}
        )
        
        report_id = create_response.json()["id"]
        
        get_response = requests.get(
            f"{BASE_URL}/api/reports/{report_id}",
            headers=headers
        )
        
        assert get_response.status_code == 200
    
    def test_user_cannot_access_other_report(self):
        headers1 = {"Authorization": f"Bearer {self.user1_token}"}
        headers2 = {"Authorization": f"Bearer {self.user2_token}"}
        
        create_response = requests.post(
            f"{BASE_URL}/api/reports",
            headers=headers1,
            json={"title": "User1 Report", "description": "Test", "type": "leak"}
        )
        
        report_id = create_response.json()["id"]
        
        get_response = requests.get(
            f"{BASE_URL}/api/reports/{report_id}",
            headers=headers2
        )
        
        assert get_response.status_code == 403