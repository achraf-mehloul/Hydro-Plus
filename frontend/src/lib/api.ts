const API_URL = 'http://127.0.0.1:8000/api';

const getToken = () => localStorage.getItem('access_token');

async function request(endpoint: string, options: RequestInit = {}) {
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
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  }
  
  return response;
}

export const auth = {
  login: async (email_or_phone: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_or_phone, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
    }
    return { ok: res.ok, data };
  },
  
  register: async (userData: any) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
    }
    return { ok: res.ok, data };
  },
  
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
  
  getMe: async () => {
    const res = await request('/auth/me');
    if (res.ok) {
      return await res.json();
    }
    return null;
  },
};

export const users = {
  getProfile: async () => {
    const res = await request('/users/profile');
    if (res.ok) {
      return await res.json();
    }
    return null;
  },
  
  updateProfile: async (data: any) => {
    const res = await request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return res.ok;
  },
  
  uploadAvatar: async (file: File) => {
    const token = getToken();
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_URL}/users/upload-avatar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.avatar_url;
    }
    return null;
  },
  
  deleteAvatar: async () => {
    const res = await request('/users/avatar', { method: 'DELETE' });
    return res.ok;
  },
};

export const reports = {
  getAll: () => request('/reports').then(res => res.json()),
  getOne: (id: number) => request(`/reports/${id}`).then(res => res.json()),
  create: (data: any) => request('/reports', {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(res => res.json()),
  update: (id: number, data: any) => request(`/reports/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }).then(res => res.json()),
  delete: (id: number) => request(`/reports/${id}`, {
    method: 'DELETE',
  }),
};

export const water = {
  getReadings: (days: number = 30) => request(`/water/readings?days=${days}`).then(res => res.json()),
  addReading: (data: any) => request('/water/readings', {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(res => res.json()),
  getStats: () => request('/water/statistics').then(res => res.json()),
};

export const notifications = {
  getAll: () => request('/notifications').then(res => res.json()),
  getUnreadCount: () => request('/notifications/unread/count').then(res => res.json()),
  markAsRead: (id: number) => request(`/notifications/${id}/read`, { method: 'POST' }).then(res => res.json()),
  markAllAsRead: () => request('/notifications/read-all', { method: 'POST' }).then(res => res.json()),
};