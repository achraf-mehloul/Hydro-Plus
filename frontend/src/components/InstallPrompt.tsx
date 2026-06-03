import { useTranslation } from '@/hooks/useTranslation';
import { useAppStore } from '@/stores/appStore';
import { Download, Wifi, Zap, Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function InstallPrompt() {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-foreground/20 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ y: 40 }}
          animate={{ y: 0 }}
          className="w-full max-w-sm glass rounded-3xl p-6 space-y-5"
        >
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Download className="w-6 h-6 text-primary-foreground" />
            </div>
            <button onClick={() => setShow(false)} className="p-1 text-muted-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <h3 className="text-lg font-bold text-foreground">{t('installApp')}</h3>
          </div>

          <div className="space-y-3">
            {[
              { icon: Wifi, text: t('installBenefit1') },
              { icon: Zap, text: t('installBenefit2') },
              { icon: Bell, text: t('installBenefit3') },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShow(false)}
              className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              {t('later')}
            </button>
            <button
              onClick={() => setShow(false)}
              className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold transition-transform active:scale-95 ripple"
            >
              {t('install')}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
