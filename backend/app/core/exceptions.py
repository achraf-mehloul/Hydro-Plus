class AppException(Exception):
    """Base exception for application"""
    pass

class UnauthorizedException(AppException):
    """Raised when authentication fails"""
    pass

class ForbiddenException(AppException):
    """Raised when user lacks permissions (RLS)"""
    pass

class NotFoundException(AppException):
    """Raised when resource not found"""
    pass

class ConflictException(AppException):
    """Raised when resource already exists"""
    pass

class RateLimitException(AppException):
    """Raised when rate limit exceeded"""
    pass

class SecurityException(AppException):
    """Raised when WAF blocks request"""
    pass