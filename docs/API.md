docs/API.md
markdown

# API Documentation - Water App

## Base URL

http://localhost:8000/api
text


## Authentication Endpoints

### POST /auth/register
Register a new user

**Request Body:**
```json
{
  "email": "user@example.com",
  "full_name": "User Name",
  "password": "Password123!",
  "phone": "0555123456",
  "wilaya": "Alger",
  "commune": "Sidi M'Hamed"
}

Response:
json

{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "bearer"
}

POST /auth/login

Login with email or phone

Request Body:
json

{
  "email_or_phone": "user@example.com",
  "password": "Password123!"
}

POST /auth/refresh

Refresh access token

Request Body:
json

{
  "refresh_token": "eyJ..."
}

GET /auth/me

Get current user info

Headers: Authorization: Bearer <token>
Reports Endpoints
GET /reports

Get all reports (with RLS)

Headers: Authorization: Bearer <token>
POST /reports

Create new report

Request Body:
json

{
  "title": "Water Leak",
  "description": "Leak at main street",
  "type": "leak",
  "latitude": 36.7538,
  "longitude": 3.0588,
  "wilaya": "Alger"
}

GET /reports/{id}

Get specific report
PUT /reports/{id}

Update report
DELETE /reports/{id}

Delete report
Status Codes
Code	Description
200	Success
201	Created
204	No Content
400	Bad Request
401	Unauthorized
403	Forbidden
404	Not Found
429	Too Many Requests
text


### `docs/SECURITY.md`

```markdown
# Security Documentation - Water App

## Security Features

### 1. JWT Authentication
- Access tokens expire in 30 minutes
- Refresh tokens expire in 7 days
- Tokens are signed with HS256

### 2. Row Level Security (RLS)
- Users can only access their own data
- Government users access their wilaya data
- Admins have full access

### 3. Web Application Firewall (WAF)
- SQL Injection detection and blocking
- XSS attack prevention
- Path traversal protection
- Command injection detection
- Rate limiting (100 requests per minute)

### 4. Security Headers

X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'
text


### 5. Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

## Security Recommendations for Production

1. Use HTTPS with valid SSL certificate
2. Store secrets in environment variables
3. Regularly update dependencies
4. Enable 2FA for admin accounts
5. Regular security audits
6. Database encryption at rest
7. Implement request logging
8. Use rate limiting per user/IP

## Incident Response

In case of security incident:
1. Revoke all tokens
2. Block suspicious IPs
3. Rotate all secrets
4. Restore from backup if needed