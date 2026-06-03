from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
import logging
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = datetime.now()
        
        # Log request
        logger.info(f"Request: {request.method} {request.url.path} from {request.client.host if request.client else 'unknown'}")
        
        response = await call_next(request)
        
        # Log response
        duration = (datetime.now() - start_time).total_seconds()
        logger.info(f"Response: {response.status_code} - Duration: {duration:.3f}s")
        
        return response