import { useTranslation } from '@/hooks/useTranslation';
import { useAppStore } from '@/stores/appStore';
import BottomNav from '@/components/BottomNav';
import EmptyState from '@/components/EmptyState';
import { Bell, Check, CheckCheck, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Notifications() {
  const { t, dir } = useTranslation();
  const notifications = useAppStore((s) => s.notifications);
  const markAllRead = useAppStore((s) => s.markAllNotificationsRead);
  const markRead = useAppStore((s) => s.markNotificationRead);
  const unread = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    if (type === 'success') return <CheckCircle className="w-5 h-5 text-accent" />;
    if (type === 'alert') return <AlertTriangle className="w-5 h-5 text-destructive" />;
    return <Info className="w-5 h-5 text-primary" />;
  };

  return (
    <div className="min-h-screen bg-background pb-20" dir={dir}>
      <div className="sticky top-0 z-40 glass px-4 py-3">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <h1 className="text-base font-bold text-foreground">{t('notifications')}</h1>
            {unread > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold">
                {unread}
              </span>
            )}
          </div>
          {unread > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1 text-xs text-primary font-semibold">
              <CheckCheck className="w-4 h-4" />
              {t('markAllRead')}
            </button>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-4">
        {notifications.length === 0 ? (
          <EmptyState
            icon={Bell}
            title={t('noNotifications')}
            description={t('tagline')}
          />
        ) : (
          <div className="space-y-2">
            {notifications.map((notif, i) => (
              <motion.button
                key={notif.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => markRead(notif.id)}
                className={`w-full text-start p-4 rounded-2xl border transition-colors ${
                  notif.read ? 'bg-card border-border' : 'bg-primary/5 border-primary/20'
                }`}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">{getIcon(notif.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{notif.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
                  </div>
                  {!notif.read && <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />}
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
