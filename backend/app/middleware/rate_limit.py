from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from collections import defaultdict
from datetime import datetime, timedelta
from app.config import settings

class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)
        self.requests = defaultdict(list)
        self.rate_limit = settings.RATE_LIMIT_REQUESTS
        self.period = settings.RATE_LIMIT_PERIOD
    
    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host if request.client else "unknown"
        now = datetime.now()
        
        # Clean old requests
        self.requests[client_ip] = [
            req_time for req_time in self.requests[client_ip]
            if now - req_time < timedelta(seconds=self.period)
        ]
        
        # Check rate limit
        if len(self.requests[client_ip]) >= self.rate_limit:
            raise HTTPException(status_code=429, detail=f"Rate limit exceeded. Max {self.rate_limit} requests per {self.period} seconds")
        
        # Add current request
        self.requests[client_ip].append(now)
        
        response = await call_next(request)
        return response