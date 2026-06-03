const API_URL = 'http://localhost:8000/api';

let accessToken: string | null = localStorage.getItem('admin_access_token');

export function setToken(token: string | null) {
  accessToken = token;
  if (token) {
    localStorage.setItem('admin_access_token', token);
  } else {
    localStorage.removeItem('admin_access_token');
  }
}

export function getToken(): string | null {
  return accessToken || localStorage.getItem('admin_access_token');
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
  
  if (response.status === 401) {
    setToken(null);
    window.location.href = '/';
    throw new Error('غير مصرح');
  }
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'حدث خطأ');
  }
  
  return response.json();
}

export async function login(emailOrPhone: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email_or_phone: emailOrPhone, password }),
  });
  
  const data = await response.json();
  
  if (response.ok) {
    setToken(data.access_token);
    return { success: true, data };
  }
  
  return { success: false, error: data.detail || 'فشل تسجيل الدخول' };
}

export async function logout() {
  try {
    await request('/auth/logout', { method: 'POST' });
  } catch (error) {
    console.error(error);
  }
  setToken(null);
}

export async function getCurrentUser() {
  return request<{ id: number; full_name: string; role: string }>('/auth/me');
}

export async function getAllUsers() {
  return request<User[]>('/admin/users');
}

export async function getAllReports() {
  return request<Report[]>('/reports');
}

export async function getAllWaterReadings() {
  return request<WaterReading[]>('/water/readings?days=365');
}

export async function toggleUserStatus(userId: number, isActive: boolean) {
  const endpoint = isActive ? `/admin/users/${userId}/enable` : `/admin/users/${userId}/disable`;
  return request(endpoint, { method: 'POST' });
}

export async function deleteUser(userId: number) {
  return request(`/admin/users/${userId}`, { method: 'DELETE' });
}

export async function getWaterStatistics() {
  return request<{ average: number; total: number; readings_count: number }>('/water/statistics');
}