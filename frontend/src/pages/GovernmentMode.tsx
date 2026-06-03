import { useTranslation } from '@/hooks/useTranslation';
import { BarChart3, Users, MapPin, TrendingUp, Droplets, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoImg from '@/assets/logo.jpg';

export default function GovernmentMode() {
  const { t, dir } = useTranslation();
  const navigate = useNavigate();

  const stats = [
    { icon: BarChart3, label: t('totalReports'), value: '—', color: 'text-primary', bg: 'bg-primary/10' },
    { icon: Users, label: t('activeUsers'), value: '—', color: 'text-accent', bg: 'bg-accent/10' },
    { icon: MapPin, label: t('coveredAreas'), value: '—', color: 'text-warning', bg: 'bg-warning/10' },
    { icon: TrendingUp, label: t('waterCoverage'), value: '—', color: 'text-primary', bg: 'bg-primary/10' },
  ];

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate(-1)} className="p-2 text-muted-foreground">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <img src={logoImg} alt="" className="w-14 h-14 rounded-2xl object-cover shadow-lg" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t('appName')}</h1>
              <p className="text-sm text-muted-foreground">{t('governmentMode')} — {t('nationalOverview')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-card border border-border p-6 text-center"
            >
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Prediction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Activity className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">{t('waterIntelligence')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <Droplets className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="text-sm font-bold text-foreground">{t('waterAvailability')}</div>
              <div className="text-2xl font-bold text-accent mt-1">—</div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-sm font-bold text-foreground">{t('prediction')}</div>
              <div className="text-xs text-muted-foreground mt-2">{t('predictionText')}</div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <Activity className="w-6 h-6 text-warning mx-auto mb-2" />
              <div className="text-sm font-bold text-foreground">{t('lastActivity')}</div>
              <div className="text-2xl font-bold text-warning mt-1">—</div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center py-4 text-xs text-muted-foreground">
          <p>{t('appVersion')}</p>
          <p>{t('byAuthor')} — {t('byClub')}</p>
        </div>
      </div>
    </div>
  );
}
