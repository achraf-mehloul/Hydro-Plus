import pytest
import requests

BASE_URL = "http://localhost:8000"

class TestReportCRUD:
    
    def setup_method(self):
        requests.post(f"{BASE_URL}/api/auth/register", json={
            "email": "reportuser@test.com",
            "full_name": "Report User",
            "password": "Report123!",
            "phone": "0555123456"
        })
        login_response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email_or_phone": "reportuser@test.com", "password": "Report123!"}
        )
        self.token = login_response.json()["access_token"]
        self.headers = {"Authorization": f"Bearer {self.token}"}
    
    def test_create_report(self):
        response = requests.post(
            f"{BASE_URL}/api/reports",
            headers=self.headers,
            json={
                "title": "Test Report",
                "description": "This is a test report",
                "type": "leak",
                "latitude": 36.7538,
                "longitude": 3.0588,
                "wilaya": "Alger"
            }
        )
        assert response.status_code == 201
        assert response.json()["title"] == "Test Report"
    
    def test_get_all_reports(self):
        response = requests.get(f"{BASE_URL}/api/reports", headers=self.headers)
        assert response.status_code == 200
        assert isinstance(response.json(), list)
    
    def test_update_report(self):
        create_response = requests.post(
            f"{BASE_URL}/api/reports",
            headers=self.headers,
            json={"title": "Original", "description": "Original desc", "type": "leak"}
        )
        report_id = create_response.json()["id"]
        
        update_response = requests.put(
            f"{BASE_URL}/api/reports/{report_id}",
            headers=self.headers,
            json={"title": "Updated Title"}
        )
        assert update_response.status_code == 200
        assert update_response.json()["title"] == "Updated Title"
    
    def test_delete_report(self):
        create_response = requests.post(
            f"{BASE_URL}/api/reports",
            headers=self.headers,
            json={"title": "To Delete", "description": "Delete me", "type": "leak"}
        )
        report_id = create_response.json()["id"]
        
        delete_response = requests.delete(
            f"{BASE_URL}/api/reports/{report_id}",
            headers=self.headers
        )
        assert delete_response.status_code == 204