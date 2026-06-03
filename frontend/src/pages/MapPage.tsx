import { useTranslation } from '@/hooks/useTranslation';
import { useAppStore } from '@/stores/appStore';
import BottomNav from '@/components/BottomNav';
import GoogleMapView from '@/components/GoogleMap';
import OfflineBanner from '@/components/OfflineBanner';
import { Search, MapPin } from 'lucide-react';
import { useState } from 'react';
import { wilayas } from '@/data/wilayas';
import { motion, AnimatePresence } from 'framer-motion';
import { sanitizeInput } from '@/lib/sanitize';

export default function MapPage() {
  const { t, dir, language } = useTranslation();
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const cleanSearch = sanitizeInput(search).toLowerCase();
  const filtered = cleanSearch
    ? wilayas.filter(
        (w) =>
          w.name.toLowerCase().includes(cleanSearch) ||
          w.nameAr.includes(cleanSearch)
      )
    : [];

  return (
    <div className="min-h-screen bg-background flex flex-col" dir={dir}>
      <OfflineBanner />

      {/* Header */}
      <div className="sticky top-0 z-40 glass px-4 py-3">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
          <h1 className="text-base font-bold text-foreground flex-1">{t('map')}</h1>
          <button onClick={() => setShowSearch(!showSearch)} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <Search className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="max-w-lg mx-auto mt-2 overflow-hidden"
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('searchWilaya')}
                className="w-full h-10 px-4 rounded-xl border border-input bg-card text-foreground text-sm focus:ring-2 focus:ring-primary outline-none"
              />
              {filtered.length > 0 && (
                <div className="mt-1 rounded-xl bg-card border border-border max-h-48 overflow-auto">
                  {filtered.slice(0, 8).map((w) => (
                    <button
                      key={w.code}
                      onClick={() => { setSearch(''); setShowSearch(false); }}
                      className="w-full text-start px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2"
                    >
                      <span className="text-xs text-muted-foreground font-mono">{w.code}</span>
                      <span>{language === 'ar' ? w.nameAr : w.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Map */}
      <div className="flex-1 relative pb-16">
        <GoogleMapView className="h-full min-h-[calc(100vh-8rem)]" />
      </div>

      <BottomNav />
    </div>
  );
}
