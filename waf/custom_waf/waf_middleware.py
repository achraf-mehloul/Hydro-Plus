import re
from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from typing import List, Dict
import json
from datetime import datetime
import os

class CustomWAFMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)
        self.blocked_ips = set()
        self.request_log = []
        
        self.sqli_patterns = [
            r"(\%27)|(\')|(\-\-)|(\%23)|(#)",
            r"(\%24)|(\$)|(\%26)|(&)",
            r"(union\s+select|select\s+.*\s+from|information_schema)",
            r"(drop\s+table|delete\s+from|insert\s+into|update\s+set)",
            r"(or\s+1\s*=\s*1|or\s+1\s*=\s*2)",
            r"(sleep\(|benchmark\(|pg_sleep\(|waitfor\s+delay)",
        ]
        
        self.xss_patterns = [
            r"<script[^>]*>.*?</script>",
            r"javascript:",
            r"onerror\s*=",
            r"onload\s*=",
            r"onclick\s*=",
            r"alert\s*\(",
            r"document\.cookie",
            r"<img.*?src.*?=.*?javascript:",
            r"<iframe.*?src.*?=.*?javascript:",
        ]
        
        self.path_traversal_patterns = [
            r"\.\./",
            r"\.\.\\",
            r"%2e%2e%2f",
            r"%2e%2e%5c",
            r"\.\.%5c",
            r"\.\.%2f",
        ]
        
        self.command_injection_patterns = [
            r"\|\s*(ls|dir|cat|type|echo|whoami)",
            r";\s*(ls|dir|cat|type|echo|whoami)",
            r"&\s*(ls|dir|cat|type|echo|whoami)",
            r"\$\{IFS\}",
            r"`.*`",
        ]
    
    def is_ip_blocked(self, client_ip: str) -> bool:
        return client_ip in self.blocked_ips
    
    def log_attack(self, client_ip: str, attack_type: str, payload: str, path: str):
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "ip": client_ip,
            "attack_type": attack_type,
            "payload": payload[:200],
            "path": path
        }
        self.request_log.append(log_entry)
        
        log_dir = "logs"
        if not os.path.exists(log_dir):
            os.makedirs(log_dir)
        
        with open(os.path.join(log_dir, "waf_attacks.log"), "a") as f:
            f.write(json.dumps(log_entry) + "\n")
    
    def check_payload(self, text: str) -> tuple[bool, str]:
        if not text:
            return False, None
        
        for pattern in self.sqli_patterns:
            if re.search(pattern, text, re.IGNORECASE):
                return True, "SQL Injection"
        
        for pattern in self.xss_patterns:
            if re.search(pattern, text, re.IGNORECASE):
                return True, "XSS Attack"
        
        for pattern in self.path_traversal_patterns:
            if re.search(pattern, text, re.IGNORECASE):
                return True, "Path Traversal"
        
        for pattern in self.command_injection_patterns:
            if re.search(pattern, text, re.IGNORECASE):
                return True, "Command Injection"
        
        return False, None
    
    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host if request.client else "unknown"
        
        if self.is_ip_blocked(client_ip):
            raise HTTPException(status_code=403, detail="Your IP has been blocked")
        
        path = request.url.path
        query_params = str(request.query_params)
        
        body = ""
        if request.method in ["POST", "PUT", "PATCH"]:
            try:
                body_bytes = await request.body()
                body = body_bytes.decode("utf-8", errors="ignore")
            except:
                pass
        
        all_input = f"{path} {query_params} {body}"
        
        is_attack, attack_type = self.check_payload(all_input)
        
        if is_attack:
            self.log_attack(client_ip, attack_type, all_input[:500], path)
            raise HTTPException(status_code=403, detail=f"WAF: {attack_type} detected and blocked")
        
        response = await call_next(request)
        return response