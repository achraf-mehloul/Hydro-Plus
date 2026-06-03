import { useTranslation } from '@/hooks/useTranslation';
import { useAppStore } from '@/stores/appStore';
import { Wifi, WifiOff, RefreshCw, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OfflineBanner() {
  const { t } = useTranslation();
  const isOnline = useAppStore((s) => s.isOnline);
  const syncStatus = useAppStore((s) => s.syncStatus);

  if (isOnline && syncStatus === 'updated') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        className={`fixed top-0 inset-x-0 z-[60] py-2 px-4 flex items-center justify-center gap-2 text-sm font-medium ${
          !isOnline
            ? 'bg-destructive text-destructive-foreground'
            : syncStatus === 'syncing'
            ? 'bg-warning text-warning-foreground'
            : 'bg-accent text-accent-foreground'
        }`}
      >
        {!isOnline ? (
          <>
            <WifiOff className="w-4 h-4" />
            <span>{t('offline')} — {t('offlineMsg')}</span>
          </>
        ) : syncStatus === 'syncing' ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>{t('syncing')}</span>
          </>
        ) : (
          <>
            <CheckCircle className="w-4 h-4" />
            <span>{t('updated')}</span>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
