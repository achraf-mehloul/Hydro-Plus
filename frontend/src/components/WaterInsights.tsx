import { useTranslation } from '@/hooks/useTranslation';
import { TrendingUp, TrendingDown, Activity, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WaterInsights() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: TrendingUp,
      label: t('waterAvailability'),
      value: '—',
      trend: '',
      color: 'text-accent',
      bg: 'bg-accent/10',
    },
    {
      icon: Activity,
      label: t('lastActivity'),
      value: '—',
      trend: '',
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      icon: BarChart3,
      label: t('prediction'),
      value: '—',
      trend: '',
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-foreground">{t('areaInsights')}</h3>
      <div className="grid grid-cols-3 gap-2">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-card border border-border p-3 text-center space-y-2"
          >
            <div className={`w-8 h-8 rounded-xl ${stat.bg} flex items-center justify-center mx-auto`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground leading-tight">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
