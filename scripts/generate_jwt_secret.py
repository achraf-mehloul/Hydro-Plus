import secrets
import base64

def generate_jwt_secret():
    secret = secrets.token_urlsafe(64)
    print("=" * 50)
    print("JWT SECRET GENERATOR")
    print("=" * 50)
    print(f"\nYour JWT Secret:\n{secret}\n")
    print("=" * 50)
    print("Add this to your .env file:")
    print(f"SECRET_KEY={secret}")
    print("=" * 50)
    
    base64_secret = base64.b64encode(secret.encode()).decode()
    print(f"\nBase64 encoded (for some systems):\n{base64_secret}\n")

if __name__ == "__main__":
    generate_jwt_secret()