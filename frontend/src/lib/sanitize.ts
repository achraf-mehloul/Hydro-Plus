import DOMPurify from 'dompurify';

export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input.trim(), { ALLOWED_TAGS: [] });
}

export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '').slice(0, 15);
}

export function escapeHtml(str: string): string {
  const map: Record<string, string> = {
    '&': '&amp;', '<': '&lt;', '>': '&gt;',
    '"': '&quot;', "'": '&#039;',
  };
  return str.replace(/[&<>"']/g, (c) => map[c] || c);
}

export function validateName(name: string): boolean {
  const clean = sanitizeInput(name);
  return clean.length >= 2 && clean.length <= 100 && !/[<>{}()[\]\\\/]/.test(clean);
}

export function validatePhone(phone: string): boolean {
  const clean = sanitizePhone(phone);
  return /^\+?\d{9,15}$/.test(clean);
}

export function validatePassword(password: string): boolean {
  return password.length >= 6 && password.length <= 128;
}
