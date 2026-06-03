import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppStore } from '@/stores/appStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Map, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import logoImg from '@/assets/logo.jpg';

const slides = [
  { icon: Droplets, titleKey: 'onboarding1Title', descKey: 'onboarding1Desc', gradient: 'from-primary/20 to-primary/5' },
  { icon: Map, titleKey: 'onboarding2Title', descKey: 'onboarding2Desc', gradient: 'from-accent/20 to-accent/5' },
  { icon: Users, titleKey: 'onboarding3Title', descKey: 'onboarding3Desc', gradient: 'from-warning/20 to-warning/5' },
];

export default function Onboarding() {
  const { t, dir } = useTranslation();
  const navigate = useNavigate();
  const setOnboarded = useAppStore((s) => s.setOnboarded);
  const [current, setCurrent] = useState(0);

  const finish = () => {
    setOnboarded();
    navigate('/login');
  };

  const isLast = current === slides.length - 1;

  return (
    <div className="min-h-screen flex flex-col bg-background" dir={dir}>
      {/* Skip */}
      <div className="flex justify-end p-4">
        <button onClick={finish} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          {t('skip')}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: dir === 'rtl' ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            <div className={`w-32 h-32 rounded-[2rem] bg-gradient-to-br ${slides[current].gradient} flex items-center justify-center mb-8`}>
              {current === 0 ? (
                <img src={logoImg} alt="Hydro Plus+" className="w-20 h-20 rounded-2xl object-cover" />
              ) : (
                (() => { const Icon = slides[current].icon; return <Icon className="w-16 h-16 text-primary" />; })()
              )}
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">{t(slides[current].titleKey)}</h2>
            <p className="text-base text-muted-foreground max-w-xs leading-relaxed">{t(slides[current].descKey)}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-primary' : 'w-2 bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="px-6 pb-10">
        <button
          onClick={() => (isLast ? finish() : setCurrent((c) => c + 1))}
          className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-base transition-transform active:scale-[0.98] ripple"
        >
          {isLast ? t('getStarted') : t('next')}
        </button>
      </div>
    </div>
  );
}
