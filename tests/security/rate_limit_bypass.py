import pytest
import requests
import time
from concurrent.futures import ThreadPoolExecutor

BASE_URL = "http://localhost:8000"

class TestRateLimitBypass:
    
    def test_rate_limit(self):
        responses = []
        for i in range(150):
            response = requests.post(
                f"{BASE_URL}/api/auth/login",
                json={"email_or_phone": "wrong@test.com", "password": "wrong"}
            )
            responses.append(response.status_code)
        
        rate_limited = any(code == 429 for code in responses)
        assert rate_limited, "Rate limiting not working"
    
    def test_concurrent_requests(self):
        def make_request():
            return requests.post(
                f"{BASE_URL}/api/auth/login",
                json={"email_or_phone": "wrong@test.com", "password": "wrong"}
            )
        
        with ThreadPoolExecutor(max_workers=50) as executor:
            futures = [executor.submit(make_request) for _ in range(100)]
            responses = [f.result().status_code for f in futures]
        
        rate_limited = any(code == 429 for code in responses)
        assert rate_limited, "Rate limiting bypassed with concurrent requests"