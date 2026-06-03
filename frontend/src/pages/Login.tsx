import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { sanitizePhone, validatePhone } from '@/lib/sanitize';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import logoImg from '@/assets/logo.jpg';
import { auth } from '@/lib/api';
import { useAppStore } from '@/stores/appStore';

export default function Login() {
  const { t, dir } = useTranslation();
  const navigate = useNavigate();
  const loginStore = useAppStore((s) => s.login);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const errs: Record<string, string> = {};
    const cleanPhone = sanitizePhone(phone);
    if (!validatePhone(cleanPhone)) errs.phone = 'رقم الهاتف غير صحيح';
    if (!password || password.length < 6) errs.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    const result = await auth.login(cleanPhone, password);
    
    if (result.ok) {
      const userData = await auth.getMe();
      if (userData) {
        loginStore({
          id: String(userData.id),
          fullName: userData.full_name,
          phone: userData.phone || cleanPhone,
          avatar: userData.avatar_url ? `http://localhost:8000${userData.avatar_url}` : undefined,
          wilaya: userData.wilaya || '',
          commune: userData.commune || '',
          neighborhood: '',
          trustLevel: 'active',
          reportsCount: 0,
          joinedAt: userData.created_at,
        });
        navigate('/');
      } else {
        setErrors({ general: 'فشل تحميل بيانات المستخدم' });
      }
    } else {
      setErrors({ general: result.data.detail || 'فشل تسجيل الدخول' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background px-6" dir={dir}>
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="flex flex-col items-center gap-3">
            <img src={logoImg} alt="Hydro Plus+" className="w-16 h-16 rounded-2xl object-cover shadow-lg" />
            <h1 className="text-2xl font-bold text-foreground">{t('login')}</h1>
            <p className="text-sm text-muted-foreground">{t('tagline')}</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground">رقم الهاتف</label>
              <input
                type="tel"
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0555123456"
                className="w-full h-12 px-4 rounded-xl border border-input bg-card text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 px-4 pr-12 rounded-xl border border-input bg-card text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>

            {errors.general && (
              <div className="p-3 bg-destructive/10 rounded-xl border border-destructive/20">
                <p className="text-xs text-destructive text-center">{errors.general}</p>
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-transform active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'جاري التسجيل...' : t('login')}
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            ليس لديك حساب؟{' '}
            <button onClick={() => navigate('/signup')} className="text-primary font-semibold">
              إنشاء حساب
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}