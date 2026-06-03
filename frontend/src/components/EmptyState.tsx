import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-xs mb-6">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-transform active:scale-95 ripple"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
