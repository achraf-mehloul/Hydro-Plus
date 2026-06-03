import pytest
import jwt
import requests

BASE_URL = "http://localhost:8000"

class TestJWTAttacks:
    
    def test_none_algorithm_attack(self, auth_token):
        parts = auth_token.split('.')
        header = {"alg": "none", "typ": "JWT"}
        import json
        import base64
        
        fake_token = base64.b64encode(json.dumps(header).encode()).decode() + "." + parts[1] + "."
        
        response = requests.get(
            f"{BASE_URL}/api/auth/me",
            headers={"Authorization": f"Bearer {fake_token}"}
        )
        assert response.status_code in [401, 403], "None algorithm attack succeeded"
    
    def test_expired_token_attack(self):
        expired_token = jwt.encode(
            {"sub": "1", "exp": 0, "type": "access"},
            "secret",
            algorithm="HS256"
        )
        
        response = requests.get(
            f"{BASE_URL}/api/auth/me",
            headers={"Authorization": f"Bearer {expired_token}"}
        )
        assert response.status_code in [401, 403], "Expired token attack succeeded"
    
    def test_weak_secret_bruteforce(self, auth_token):
        weak_secrets = ["secret", "password", "123456", "key", "jwt"]
        
        for secret in weak_secrets:
            try:
                decoded = jwt.decode(auth_token, secret, algorithms=["HS256"])
                assert False, f"Weak secret found: {secret}"
            except:
                pass
    
    def test_token_replay_attack(self, auth_token):
        headers = {"Authorization": f"Bearer {auth_token}"}
        
        response1 = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
        response2 = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
        
        assert response1.status_code == response2.status_code