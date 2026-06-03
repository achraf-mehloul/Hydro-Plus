export interface User {
  id: number;
  full_name: string;
  email: string | null;
  phone: string | null;
  wilaya: string | null;
  commune: string | null;
  role: 'citizen' | 'government' | 'admin';
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

export interface Report {
  id: number;
  user_id: number;
  title: string;
  description: string;
  type: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
  latitude: number | null;
  longitude: number | null;
  wilaya: string | null;
  commune: string | null;
  image_urls: string | null;
  created_at: string;
  resolved_at: string | null;
}

export interface WaterReading {
  id: number;
  user_id: number;
  reading_value: number;
  unit: string;
  reading_date: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  pendingReports: number;
  resolvedReports: number;
  totalReadings: number;
}