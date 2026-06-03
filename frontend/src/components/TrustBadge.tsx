import { useTranslation } from '@/hooks/useTranslation';
import type { TrustLevel } from '@/stores/appStore';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

interface TrustBadgeProps {
  level: TrustLevel;
  size?: 'sm' | 'md';
}

export default function TrustBadge({ level, size = 'sm' }: TrustBadgeProps) {
  const { t } = useTranslation();

  const config = {
    new: {
      icon: ShieldAlert,
      label: t('trustNew'),
      classes: 'bg-muted text-muted-foreground',
    },
    active: {
      icon: Shield,
      label: t('trustActive'),
      classes: 'bg-primary/10 text-primary',
    },
    trusted: {
      icon: ShieldCheck,
      label: t('trustTrusted'),
      classes: 'bg-accent/10 text-accent',
    },
  }[level];

  const Icon = config.icon;
  const s = size === 'sm' ? 'text-[10px] px-1.5 py-0.5 gap-0.5' : 'text-xs px-2 py-1 gap-1';

  return (
    <div className={`inline-flex items-center rounded-full font-semibold ${config.classes} ${s}`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      <span>{config.label}</span>
    </div>
  );
}
