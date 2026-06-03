import { useTranslation } from '@/hooks/useTranslation';
import { useAppStore, type ReportType } from '@/stores/appStore';
import TrustBadge from './TrustBadge';
import { Droplets, DollarSign, XCircle, Phone, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReportCardProps {
  report: {
    id: string;
    type: ReportType;
    description: string;
    images: string[];
    wilaya: string;
    commune: string;
    createdAt: string;
    verifiedCount: number;
    userId: string;
  };
  user?: {
    fullName: string;
    avatar?: string;
    trustLevel: 'new' | 'active' | 'trusted';
    phone: string;
  };
}

export default function ReportCard({ report, user }: ReportCardProps) {
  const { t } = useTranslation();

  const typeConfig = {
    available: {
      icon: Droplets,
      label: t('waterAvailable'),
      classes: 'bg-accent/10 text-accent border-accent/20',
    },
    sale: {
      icon: DollarSign,
      label: t('waterForSale'),
      classes: 'bg-warning/10 text-warning border-warning/20',
    },
    none: {
      icon: XCircle,
      label: t('noWater'),
      classes: 'bg-destructive/10 text-destructive border-destructive/20',
    },
  }[report.type];

  const Icon = typeConfig.icon;
  const timeAgo = getTimeAgo(report.createdAt, t);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-card border border-border p-4 space-y-3 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted overflow-hidden flex-shrink-0">
          {user?.avatar ? (
            <img src={user.avatar} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground truncate">
              {user?.fullName || '—'}
            </span>
            {user && <TrustBadge level={user.trustLevel} />}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{timeAgo}</span>
            <span>· {report.wilaya}</span>
          </div>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${typeConfig.classes}`}>
          <Icon className="w-3 h-3" />
          <span>{typeConfig.label}</span>
        </div>
      </div>

      {/* Images */}
      {report.images.length > 0 && (
        <div className="rounded-xl overflow-hidden">
          <img src={report.images[0]} alt="" className="w-full h-48 object-cover" />
        </div>
      )}

      {/* Description */}
      {report.description && (
        <p className="text-sm text-foreground/80 leading-relaxed">{report.description}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1 text-xs text-accent">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{t('communityVerified')}</span>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-semibold transition-transform active:scale-95 ripple">
          <Phone className="w-4 h-4" />
          <span>{t('contact')}</span>
        </button>
      </div>
    </motion.div>
  );
}

function getTimeAgo(dateStr: string, t: (k: string, p?: Record<string, string | number>) => string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return t('justNow');
  if (minutes < 60) return t('minutesAgo', { n: minutes });
  const hours = Math.floor(minutes / 60);
  return t('hoursAgo', { n: hours });
}
