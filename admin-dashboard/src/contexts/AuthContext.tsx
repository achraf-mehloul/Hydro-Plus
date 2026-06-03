import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, getToken, logout as apiLogout } from '../api/api';

interface User {
  id: number;
  full_name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const currentUser = await getCurrentUser();
          if (currentUser.role === 'admin') {
            setUser(currentUser);
          } else {
            await apiLogout();
          }
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}