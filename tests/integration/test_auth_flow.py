import pytest
import requests

BASE_URL = "http://localhost:8000"

class TestAuthFlow:
    
    def test_full_auth_flow(self):
        email = "flowtest@example.com"
        phone = "0777123456"
        password = "FlowTest123!"
        
        register_response = requests.post(
            f"{BASE_URL}/api/auth/register",
            json={
                "email": email,
                "full_name": "Flow Test User",
                "password": password,
                "phone": phone
            }
        )
        assert register_response.status_code == 200
        
        login_response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email_or_phone": email, "password": password}
        )
        assert login_response.status_code == 200
        access_token = login_response.json()["access_token"]
        refresh_token = login_response.json()["refresh_token"]
        
        me_response = requests.get(
            f"{BASE_URL}/api/auth/me",
            headers={"Authorization": f"Bearer {access_token}"}
        )
        assert me_response.status_code == 200
        assert me_response.json()["email"] == email
        
        refresh_response = requests.post(
            f"{BASE_URL}/api/auth/refresh",
            json={"refresh_token": refresh_token}
        )
        assert refresh_response.status_code == 200
        
        logout_response = requests.post(
            f"{BASE_URL}/api/auth/logout",
            headers={"Authorization": f"Bearer {access_token}"}
        )
        assert logout_response.status_code == 200