import { useTranslation } from '@/hooks/useTranslation';
import { useAppStore } from '@/stores/appStore';
import { useNavigate } from 'react-router-dom';
import BottomNav from '@/components/BottomNav';
import LiveStatusBanner from '@/components/LiveStatusBanner';
import WaterInsights from '@/components/WaterInsights';
import EmptyState from '@/components/EmptyState';
import ReportCard from '@/components/ReportCard';
import OfflineBanner from '@/components/OfflineBanner';
import { Droplets, Bell, TrendingUp, BarChart3, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import logoImg from '@/assets/logo.jpg';

export default function Home() {
  const { t, dir } = useTranslation();
  const navigate = useNavigate();
  const currentUser = useAppStore((s) => s.currentUser);
  const reports = useAppStore((s) => s.reports);
  const notifications = useAppStore((s) => s.notifications);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background pb-20" dir={dir}>
      <OfflineBanner />

      {/* Header */}
      <div className="sticky top-0 z-40 glass">
        <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Hydro Plus+" className="w-9 h-9 rounded-xl object-cover" />
            <div>
              <h1 className="text-base font-bold text-foreground">{t('appName')}</h1>
              <p className="text-[10px] text-muted-foreground">{t('tagline')}</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 rounded-xl hover:bg-muted transition-colors"
          >
            <Bell className="w-5 h-5 text-foreground" />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-bold">
                {unread}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 space-y-6 pt-4">
        {/* Live Status */}
        <LiveStatusBanner />

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: BarChart3, label: t('totalReports'), value: reports.length.toString(), color: 'text-primary', bg: 'bg-primary/10' },
            { icon: Activity, label: t('activeUsers'), value: '—', color: 'text-accent', bg: 'bg-accent/10' },
            { icon: TrendingUp, label: t('coveredAreas'), value: '—', color: 'text-warning', bg: 'bg-warning/10' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-card border border-border p-3 text-center"
            >
              <div className={`w-8 h-8 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-2`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-lg font-bold text-foreground">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Water Insights */}
        <WaterInsights />

        {/* Prediction */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 p-4"
        >
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-foreground">{t('prediction')}</span>
          </div>
          <p className="text-xs text-muted-foreground">{t('predictionText')}</p>
          <p className="text-[10px] text-muted-foreground mt-1">{t('predictionBasis')}</p>
        </motion.div>

        {/* Recent Reports */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-foreground">{t('recentReports')}</h3>
          {reports.length === 0 ? (
            <EmptyState
              icon={Droplets}
              title={t('noReportsYet')}
              description={t('beFirstToReport')}
              actionLabel={t('createFirstReport')}
              onAction={() => navigate('/create-report')}
            />
          ) : (
            reports.slice(0, 10).map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                user={
                  currentUser && report.userId === currentUser.id
                    ? {
                        fullName: currentUser.fullName,
                        avatar: currentUser.avatar,
                        trustLevel: currentUser.trustLevel,
                        phone: currentUser.phone,
                      }
                    : undefined
                }
              />
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
