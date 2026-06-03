import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { sanitizeInput, sanitizePhone, validateName, validatePhone, validatePassword } from '@/lib/sanitize';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import logoImg from '@/assets/logo.jpg';

export default function Signup() {
  const { t, dir } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState<'info' | 'verify'>('info');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [otp, setOtp] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const errs: Record<string, string> = {};
    if (!validateName(sanitizeInput(fullName))) errs.name = 'Invalid name';
    if (!validatePhone(sanitizePhone(phone))) errs.phone = 'Invalid phone';
    if (!validatePassword(password)) errs.password = 'Min 6 characters';
    if (password !== confirmPass) errs.confirm = 'Passwords do not match';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setStep('verify');
  };

  const sendCode = () => {
    setCodeSent(true);
  };

  const handleVerify = () => {
    if (otp.length < 4) {
      setErrors({ otp: 'Enter valid code' });
      return;
    }
    navigate('/profile-setup', {
      state: {
        fullName: sanitizeInput(fullName),
        phone: sanitizePhone(phone),
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background px-6" dir={dir}>
      <div className="pt-4">
        <button onClick={() => (step === 'verify' ? setStep('info') : navigate('/login'))} className="p-2 text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="flex flex-col items-center gap-3">
            <img src={logoImg} alt="Hydro Plus+" className="w-14 h-14 rounded-2xl object-cover shadow-lg" />
            <h1 className="text-2xl font-bold text-foreground">{t('signup')}</h1>
          </div>

          {step === 'info' ? (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-foreground">{t('fullName')}</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-input bg-card text-foreground text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-foreground">{t('phoneNumber')}</label>
                <input
                  type="tel"
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+213 5XX XXX XXX"
                  className="w-full h-12 px-4 rounded-xl border border-input bg-card text-foreground text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-foreground">{t('password')}</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 px-4 pr-12 rounded-xl border border-input bg-card text-foreground text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-foreground">{t('confirmPassword')}</label>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-input bg-card text-foreground text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                />
                {errors.confirm && <p className="text-xs text-destructive">{errors.confirm}</p>}
              </div>

              <button onClick={handleNext} className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-transform active:scale-[0.98] ripple">
                {t('next')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                {t('verificationCode')}
              </p>

              {!codeSent ? (
                <button onClick={sendCode} className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm ripple">
                  {t('sendCode')}
                </button>
              ) : (
                <>
                  <input
                    type="text"
                    dir="ltr"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="XXXXXX"
                    className="w-full h-14 px-4 rounded-xl border border-input bg-card text-foreground text-center text-2xl font-bold tracking-[0.5em] focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                  {errors.otp && <p className="text-xs text-destructive text-center">{errors.otp}</p>}
                  <button onClick={handleVerify} className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm ripple">
                    {t('verify')}
                  </button>
                </>
              )}
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground">
            {t('login')}?{' '}
            <button onClick={() => navigate('/login')} className="text-primary font-semibold">
              {t('login')}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
