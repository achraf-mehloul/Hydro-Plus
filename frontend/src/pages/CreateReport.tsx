import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppStore } from '@/stores/appStore';
import { sanitizeInput } from '@/lib/sanitize';
import ImageUpload from '@/components/ImageUpload';
import BottomNav from '@/components/BottomNav';
import { ArrowLeft, Droplets, DollarSign, XCircle, MapPin, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const reportTypes = [
  { type: 'available' as const, icon: Droplets, labelKey: 'waterAvailable', color: 'border-accent bg-accent/10 text-accent' },
  { type: 'sale' as const, icon: DollarSign, labelKey: 'waterForSale', color: 'border-warning bg-warning/10 text-warning' },
  { type: 'none' as const, icon: XCircle, labelKey: 'noWater', color: 'border-destructive bg-destructive/10 text-destructive' },
];

export default function CreateReport() {
  const { t, dir } = useTranslation();
  const navigate = useNavigate();
  const addReport = useAppStore((s) => s.addReport);
  const addNotification = useAppStore((s) => s.addNotification);
  const currentUser = useAppStore((s) => s.currentUser);

  const [type, setType] = useState<'available' | 'sale' | 'none' | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [hasWell, setHasWell] = useState(false);
  const [price, setPrice] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!type || !currentUser) return;

    addReport({
      id: crypto.randomUUID(),
      userId: currentUser.id,
      type,
      description: sanitizeInput(description),
      images,
      hasWell,
      price: type === 'sale' ? Number(price) || 0 : undefined,
      lat: 28 + Math.random() * 8,
      lng: -2 + Math.random() * 10,
      wilaya: currentUser.wilaya,
      commune: currentUser.commune,
      neighborhood: currentUser.neighborhood,
      createdAt: new Date().toISOString(),
      verifiedCount: 0,
    });

    addNotification({
      id: crypto.randomUUID(),
      type: 'success',
      title: t('createReport'),
      message: t('communityVerified'),
      read: false,
      createdAt: new Date().toISOString(),
    });

    setSubmitted(true);
    setTimeout(() => navigate('/'), 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" dir={dir}>
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
            <Check className="w-10 h-10 text-accent" />
          </div>
          <p className="text-lg font-bold text-foreground">{t('submit')}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20" dir={dir}>
      {/* Header */}
      <div className="sticky top-0 z-40 glass px-4 py-3">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 text-muted-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-foreground">{t('createReport')}</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 space-y-6 pt-4">
        {/* Report type */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-foreground">{t('reportType')}</label>
          <div className="grid grid-cols-3 gap-2">
            {reportTypes.map((rt) => {
              const selected = type === rt.type;
              return (
                <button
                  key={rt.type}
                  onClick={() => setType(rt.type)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                    selected ? rt.color + ' border-current' : 'border-border bg-card hover:border-primary/30'
                  }`}
                >
                  <rt.icon className={`w-6 h-6 ${selected ? '' : 'text-muted-foreground'}`} />
                  <span className={`text-xs font-semibold text-center ${selected ? '' : 'text-muted-foreground'}`}>
                    {t(rt.labelKey)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Images */}
        <ImageUpload images={images} onImagesChange={setImages} />

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-foreground">{t('description')}</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-input bg-card text-foreground text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
          />
        </div>

        {/* Well */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-card border border-border">
          <span className="text-sm font-semibold text-foreground">{t('hasWell')}</span>
          <button
            onClick={() => setHasWell(!hasWell)}
            className={`w-12 h-7 rounded-full transition-colors ${hasWell ? 'bg-primary' : 'bg-muted'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-card shadow-md transition-transform ${hasWell ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        {/* Price */}
        <AnimatePresence>
          {type === 'sale' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground">{t('price')} (DZD)</label>
              <input
                type="number"
                dir="ltr"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-input bg-card text-foreground text-sm focus:ring-2 focus:ring-primary outline-none"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Location */}
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border">
          <MapPin className="w-5 h-5 text-primary" />
          <div className="flex-1">
            <span className="text-sm font-semibold text-foreground">{t('location')}</span>
            <p className="text-xs text-muted-foreground">{currentUser?.wilaya} · {currentUser?.commune}</p>
          </div>
          <span className="text-xs text-primary font-semibold">{t('autoDetect')}</span>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!type}
          className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-transform active:scale-[0.98] ripple disabled:opacity-50"
        >
          {t('submit')}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
