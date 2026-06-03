#!/bin/bash

echo "🔒 SECURITY AUDIT SCRIPT"
echo "========================"

echo -e "\n📁 Checking for exposed .env files..."
find . -name ".env" -type f 2>/dev/null

echo -e "\n🔑 Checking for hardcoded secrets..."
grep -r "SECRET_KEY\|PASSWORD\|API_KEY" --include="*.py" --include="*.js" --include="*.ts" . 2>/dev/null | grep -v "test" | grep -v "example"

echo -e "\n📦 Checking dependencies for vulnerabilities..."
cd backend && pip-audit 2>/dev/null || echo "pip-audit not installed"

echo -e "\n🌐 Checking open ports..."
ss -tuln | grep -E ':(80|443|8000|5432|6379|8080|3001)'

echo -e "\n🧪 Testing SQL Injection..."
curl -s -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email_or_phone": "admin\' OR \'1\'=\'1", "password": "test"}' \
  | grep -i "error" && echo "✅ SQL Injection blocked" || echo "⚠️ SQL Injection may be vulnerable"

echo -e "\n🧪 Testing XSS..."
curl -s -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@test.com", "full_name": "<script>alert(1)</script>", "password": "test123"}' \
  | grep -i "error" && echo "✅ XSS blocked" || echo "⚠️ XSS may be vulnerable"

echo -e "\n📊 Security Headers Check..."
curl -s -I http://localhost:8000 | grep -E "X-Content-Type-Options|X-Frame-Options|X-XSS-Protection|Strict-Transport-Security"

echo -e "\n✅ Security audit completed!"