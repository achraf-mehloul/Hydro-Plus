import { useTranslation } from '@/hooks/useTranslation';
import { useAppStore, type WaterStatus } from '@/stores/appStore';
import { motion } from 'framer-motion';

export default function LiveStatusBanner() {
  const { t } = useTranslation();
  const reports = useAppStore((s) => s.reports);

  // Derive status from reports (or default)
  let status: WaterStatus = 'stable';
  if (reports.length > 0) {
    const noneCount = reports.filter((r) => r.type === 'none').length;
    const ratio = noneCount / reports.length;
    if (ratio > 0.6) status = 'shortage';
    else if (ratio > 0.3) status = 'partial';
  }

  const config = {
    stable: {
      bg: 'bg-accent/10 border-accent/30',
      dot: 'bg-accent',
      text: t('waterStable'),
      emoji: '🟢',
    },
    partial: {
      bg: 'bg-warning/10 border-warning/30',
      dot: 'bg-warning',
      text: t('waterPartial'),
      emoji: '🟡',
    },
    shortage: {
      bg: 'bg-destructive/10 border-destructive/30',
      dot: 'bg-destructive',
      text: t('waterShortage'),
      emoji: '🔴',
    },
  }[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border ${config.bg}`}
    >
      <div className={`w-2.5 h-2.5 rounded-full ${config.dot} animate-pulse-water`} />
      <span className="text-sm font-semibold text-foreground">{config.text}</span>
    </motion.div>
  );
}
