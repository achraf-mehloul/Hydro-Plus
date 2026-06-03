import { useAppStore } from '@/stores/appStore';
import { useTranslation } from '@/hooks/useTranslation';
import { Home, Map, Plus, Bell, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { key: 'home', icon: Home, path: '/', isCenter: false },
  { key: 'map', icon: Map, path: '/map', isCenter: false },
  { key: 'report', icon: Plus, path: '/create-report', isCenter: true },
  { key: 'notifications', icon: Bell, path: '/notifications', isCenter: false },
  { key: 'settings', icon: Settings, path: '/settings', isCenter: false },
];

export default function BottomNav() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notifications = useAppStore((s) => s.notifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 glass safe-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <button
                key={item.key}
                onClick={() => navigate(item.path)}
                className="relative -mt-6 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 ripple transition-transform active:scale-95"
              >
                <Icon className="w-6 h-6 text-primary-foreground" />
              </button>
            );
          }

          return (
            <button
              key={item.key}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center gap-0.5 p-2 transition-colors"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                {item.key === 'notifications' && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {t(item.key)}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-0 w-8 h-0.5 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
