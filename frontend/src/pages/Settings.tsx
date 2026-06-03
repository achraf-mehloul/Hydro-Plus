import { useTranslation } from '@/hooks/useTranslation';
import { useAppStore } from '@/stores/appStore';
import type { Language } from '@/i18n/translations';
import BottomNav from '@/components/BottomNav';
import { User, Globe, Moon, Sun, Shield, FileText, Mail, ChevronRight, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logoImg from '@/assets/logo.jpg';

export default function SettingsPage() {
  const { t, dir } = useTranslation();
  const navigate = useNavigate();
  const language = useAppStore((s) => s.language);
  const darkMode = useAppStore((s) => s.darkMode);
  const setLanguage = useAppStore((s) => s.setLanguage);
  const setDarkMode = useAppStore((s) => s.setDarkMode);
  const logout = useAppStore((s) => s.logout);
  const currentUser = useAppStore((s) => s.currentUser);

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  const languages: { key: Language; label: string }[] = [
    { key: 'ar', label: t('arabic') },
    { key: 'fr', label: t('french') },
    { key: 'en', label: t('english') },
  ];

  const settingsGroups = [
    {
      items: [
        {
          icon: User,
          label: t('profile'),
          onClick: () => navigate('/profile'),
          trailing: <ChevronRight className="w-4 h-4 text-muted-foreground" />,
        },
      ],
    },
    {
      items: [
        {
          icon: Globe,
          label: t('language'),
          trailing: (
            <div className="flex gap-1">
              {languages.map((lang) => (
                <button
                  key={lang.key}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLanguage(lang.key);
                    document.documentElement.dir = lang.key === 'ar' ? 'rtl' : 'ltr';
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    language === lang.key
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          ),
        },
        {
          icon: darkMode ? Moon : Sun,
          label: t('darkMode'),
          onClick: toggleDark,
          trailing: (
            <div className={`w-12 h-7 rounded-full transition-colors ${darkMode ? 'bg-primary' : 'bg-muted'}`}>
              <div
                className={`w-5 h-5 rounded-full bg-card shadow-md transition-transform mt-1 ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </div>
          ),
        },
      ],
    },
    {
      items: [
        {
          icon: Shield,
          label: t('privacyPolicy'),
          onClick: () => {},
          trailing: <ChevronRight className="w-4 h-4 text-muted-foreground" />,
        },
        {
          icon: FileText,
          label: t('termsOfUse'),
          onClick: () => {},
          trailing: <ChevronRight className="w-4 h-4 text-muted-foreground" />,
        },
        {
          icon: Mail,
          label: t('contactUs'),
          onClick: () => {},
          trailing: <ChevronRight className="w-4 h-4 text-muted-foreground" />,
        },
      ],
    },
    {
      items: [
        {
          icon: LogOut,
          label: t('login') === 'Log In' ? 'Log Out' : 'تسجيل الخروج',
          onClick: () => {
            logout();
            navigate('/login');
          },
          danger: true,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20" dir={dir}>
      <div className="sticky top-0 z-40 glass px-4 py-3">
        <div className="max-w-lg mx-auto">
          <h1 className="text-base font-bold text-foreground">{t('settings')}</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-4 space-y-4">
        {currentUser && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate('/profile')}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card border border-border text-start cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground truncate">{currentUser.fullName || '—'}</p>
              <p className="text-xs text-muted-foreground">{currentUser.wilaya}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        )}

        {settingsGroups.map((group, gi) => (
          <motion.div
            key={gi}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.05 }}
            className="rounded-2xl bg-card border border-border overflow-hidden"
          >
            {group.items.map((item, ii) => (
              <button
                key={ii}
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-start hover:bg-muted/50 transition-colors ${
                  ii > 0 ? 'border-t border-border' : ''
                }`}
              >
                <item.icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    (item as any).danger ? 'text-destructive' : 'text-muted-foreground'
                  }`}
                />
                <span
                  className={`flex-1 text-sm font-medium ${
                    (item as any).danger ? 'text-destructive' : 'text-foreground'
                  }`}
                >
                  {item.label}
                </span>
                {'trailing' in item && item.trailing}
              </button>
            ))}
          </motion.div>
        ))}

        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <img src={logoImg} alt="Hydro Plus+" className="w-10 h-10 rounded-xl object-cover opacity-60" />
          <p className="text-xs font-bold text-muted-foreground">{t('appVersion')}</p>
          <p className="text-[10px] text-muted-foreground">{t('byAuthor')}</p>
          <p className="text-[10px] text-muted-foreground">{t('byClub')}</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}