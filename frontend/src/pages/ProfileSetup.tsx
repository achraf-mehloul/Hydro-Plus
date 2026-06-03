import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppStore } from '@/stores/appStore';
import { wilayas } from '@/data/wilayas';
import { Camera, ChevronDown, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfileSetup() {
  const { t, dir, language } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAppStore((s) => s.login);
  const { fullName = '', phone = '' } = (location.state as any) || {};

  const [avatar, setAvatar] = useState<string | undefined>();
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');
  const [neighborhood, setNeighborhood] = useState('');

  const currentWilaya = wilayas.find((w) => w.code === selectedWilaya);

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleComplete = () => {
    login({
      id: crypto.randomUUID(),
      fullName,
      phone,
      avatar,
      wilaya: currentWilaya ? (language === 'ar' ? currentWilaya.nameAr : currentWilaya.name) : '',
      commune: selectedCommune,
      neighborhood,
      trustLevel: 'new',
      reportsCount: 0,
      joinedAt: new Date().toISOString(),
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background px-6" dir={dir}>
      <div className="pt-4">
        <button onClick={() => navigate(-1)} className="p-2 text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full py-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">{t('profileSetup')}</h1>
          </div>

          {/* Avatar */}
          <div className="flex justify-center">
            <label className="relative cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-muted overflow-hidden border-4 border-card shadow-lg">
                {avatar ? (
                  <img src={avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md">
                <Camera className="w-4 h-4 text-primary-foreground" />
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
            </label>
          </div>

          {/* Wilaya */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">{t('selectWilaya')}</label>
            <div className="relative">
              <select
                value={selectedWilaya}
                onChange={(e) => { setSelectedWilaya(e.target.value); setSelectedCommune(''); }}
                className="w-full h-12 px-4 rounded-xl border border-input bg-card text-foreground text-sm appearance-none focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="">{t('selectWilaya')}</option>
                {wilayas.map((w) => (
                  <option key={w.code} value={w.code}>
                    {w.code} - {language === 'ar' ? w.nameAr : w.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Commune */}
          {currentWilaya && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground">{t('selectCommune')}</label>
              <div className="relative">
                <select
                  value={selectedCommune}
                  onChange={(e) => setSelectedCommune(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-input bg-card text-foreground text-sm appearance-none focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="">{t('selectCommune')}</option>
                  {currentWilaya.communes.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </motion.div>
          )}

          {/* Neighborhood */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">{t('selectNeighborhood')}</label>
            <input
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-input bg-card text-foreground text-sm focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <button
            onClick={handleComplete}
            disabled={!selectedWilaya || !selectedCommune}
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-transform active:scale-[0.98] ripple disabled:opacity-50"
          >
            {t('completeSetup')}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
