from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from typing import List
import re

class WAFMiddleware(BaseHTTPMiddleware):
    
    SQLI_PATTERNS: List[str] = [
        r"(\%27)|(\')|(\-\-)|(\%23)|(#)",
        r"(union\s+select|select\s+.*\s+from|information_schema)",
        r"(drop\s+table|delete\s+from|insert\s+into|update\s+set)",
        r"(or\s+1\s*=\s*1|or\s+1\s*=\s*2)",
    ]
    
    XSS_PATTERNS: List[str] = [
        r"<script[^>]*>.*?</script>",
        r"javascript:",
        r"onerror\s*=",
        r"onload\s*=",
        r"alert\s*\(",
        r"document\.cookie",
    ]
    
    PATH_TRAVERSAL_PATTERNS: List[str] = [
        r"\.\./",
        r"\.\.\\",
        r"%2e%2e%2f",
        r"%2e%2e%5c",
    ]
    
    EXCLUDED_PATHS: List[str] = [
        "/uploads",
        "/api/users/upload-avatar",
        "/health",
    ]
    
    async def dispatch(self, request: Request, call_next):
        for excluded in self.EXCLUDED_PATHS:
            if request.url.path.startswith(excluded):
                response = await call_next(request)
                return response
        
        path = request.url.path
        query_params = str(request.query_params)
        
        body = ""
        if request.method in ["POST", "PUT", "PATCH"]:
            try:
                body_bytes = await request.body()
                body = body_bytes.decode("utf-8", errors="ignore")
            except:
                pass
        
        for pattern in self.SQLI_PATTERNS:
            if re.search(pattern, path, re.IGNORECASE) or re.search(pattern, query_params, re.IGNORECASE) or re.search(pattern, body, re.IGNORECASE):
                raise HTTPException(status_code=403, detail="WAF: SQL Injection detected")
        
        for pattern in self.XSS_PATTERNS:
            if re.search(pattern, query_params, re.IGNORECASE) or re.search(pattern, body, re.IGNORECASE):
                raise HTTPException(status_code=403, detail="WAF: XSS attack detected")
        
        for pattern in self.PATH_TRAVERSAL_PATTERNS:
            if re.search(pattern, path, re.IGNORECASE) or re.search(pattern, query_params, re.IGNORECASE):
                raise HTTPException(status_code=403, detail="WAF: Path traversal detected")
        
        response = await call_next(request)
        return response