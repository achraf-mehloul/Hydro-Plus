import pytest
import requests

BASE_URL = "http://localhost:8000"

class TestNotifications:
    
    def setup_method(self):
        requests.post(f"{BASE_URL}/api/auth/register", json={
            "email": "notifuser@test.com",
            "full_name": "Notification User",
            "password": "Notif123!",
            "phone": "0555123450"
        })
        login_response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email_or_phone": "notifuser@test.com", "password": "Notif123!"}
        )
        self.token = login_response.json()["access_token"]
        self.headers = {"Authorization": f"Bearer {self.token}"}
    
    def test_get_notifications(self):
        response = requests.get(f"{BASE_URL}/api/notifications", headers=self.headers)
        assert response.status_code == 200
        assert isinstance(response.json(), list)
    
    def test_get_unread_count(self):
        response = requests.get(f"{BASE_URL}/api/notifications/unread/count", headers=self.headers)
        assert response.status_code == 200
        assert "unread_count" in response.json()
    
    def test_mark_notification_as_read(self):
        notifications = requests.get(f"{BASE_URL}/api/notifications", headers=self.headers).json()
        if notifications:
            notif_id = notifications[0]["id"]
            response = requests.post(
                f"{BASE_URL}/api/notifications/{notif_id}/read",
                headers=self.headers
            )
            assert response.status_code == 200
    
    def test_mark_all_as_read(self):
        response = requests.post(
            f"{BASE_URL}/api/notifications/read-all",
            headers=self.headers
        )
        assert response.status_code == 200