import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language } from '@/i18n/translations';

export type TrustLevel = 'new' | 'active' | 'trusted';
export type ReportType = 'available' | 'sale' | 'none';
export type WaterStatus = 'stable' | 'partial' | 'shortage';
export type SyncStatus = 'offline' | 'syncing' | 'updated';

export interface UserProfile {
  id: string;
  fullName: string;
  phone: string;
  avatar?: string;
  wilaya: string;
  commune: string;
  neighborhood: string;
  trustLevel: TrustLevel;
  reportsCount: number;
  joinedAt: string;
}

export interface WaterReport {
  id: string;
  userId: string;
  type: ReportType;
  description: string;
  images: string[];
  hasWell: boolean;
  price?: number;
  lat: number;
  lng: number;
  wilaya: string;
  commune: string;
  neighborhood: string;
  createdAt: string;
  verifiedCount: number;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'alert';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface AppState {
  // Auth
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  currentUser: UserProfile | null;

  // Settings
  language: Language;
  darkMode: boolean;
  
  // Data
  reports: WaterReport[];
  notifications: Notification[];
  
  // UI
  syncStatus: SyncStatus;
  isOnline: boolean;
  
  // Actions
  setLanguage: (lang: Language) => void;
  setDarkMode: (dark: boolean) => void;
  setOnboarded: () => void;
  login: (user: UserProfile) => void;
  logout: () => void;
  setOnline: (online: boolean) => void;
  setSyncStatus: (status: SyncStatus) => void;
  addReport: (report: WaterReport) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      hasCompletedOnboarding: false,
      currentUser: null,
      language: 'ar',
      darkMode: false,
      reports: [],
      notifications: [],
      syncStatus: 'updated',
      isOnline: true,

      setLanguage: (language) => set({ language }),
      setDarkMode: (darkMode) => set({ darkMode }),
      setOnboarded: () => set({ hasCompletedOnboarding: true }),
      login: (user) => set({ isAuthenticated: true, currentUser: user }),
      logout: () => set({ isAuthenticated: false, currentUser: null }),
      setOnline: (isOnline) => set({ isOnline }),
      setSyncStatus: (syncStatus) => set({ syncStatus }),
      addReport: (report) =>
        set((state) => ({ reports: [report, ...state.reports] })),
      addNotification: (notification) =>
        set((state) => ({ notifications: [notification, ...state.notifications] })),
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
      updateProfile: (profile) =>
        set((state) => ({
          currentUser: state.currentUser
            ? { ...state.currentUser, ...profile }
            : null,
        })),
    }),
    {
      name: 'hydro-plus-storage',
      partialize: (state) => ({
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        language: state.language,
        darkMode: state.darkMode,
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
        reports: state.reports,
        notifications: state.notifications,
      }),
    }
  )
);
