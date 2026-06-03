import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppStore } from '@/stores/appStore';
import BottomNav from '@/components/BottomNav';
import TrustBadge from '@/components/TrustBadge';
import EmptyState from '@/components/EmptyState';
import ReportCard from '@/components/ReportCard';
import { ArrowLeft, MapPin, FileText, Calendar, Camera, Trash2, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { users, auth, reports as reportsApi } from '@/lib/api';

export default function Profile() {
  const { t, dir } = useTranslation();
  const navigate = useNavigate();
  const logoutStore = useAppStore((s) => s.logout);
  const [user, setUser] = useState<any>(null);
  const [userReports, setUserReports] = useState<any[]>([]);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const profile = await users.getProfile();
    if (profile) {
      setUser(profile);
      if (profile.avatar_url) {
        setAvatar(`http://localhost:8000${profile.avatar_url}`);
      }
      const allReports = await reportsApi.getAll();
      const myReports = allReports.filter((r: any) => r.user_id === profile.id);
      setUserReports(myReports);
    } else {
      navigate('/login');
    }
    setLoading(false);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const avatarUrl = await users.uploadAvatar(file);
    if (avatarUrl) {
      const newAvatarUrl = `http://localhost:8000${avatarUrl}`;
      setAvatar(newAvatarUrl);
      const profile = await users.getProfile();
      setUser(profile);
    }
    setUploading(false);
  };

  const handleDeleteAvatar = async () => {
    const success = await users.deleteAvatar();
    if (success) {
      setAvatar(null);
      const profile = await users.getProfile();
      setUser(profile);
    }
  };

  const handleLogout = () => {
    auth.logout();
    logoutStore();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-20" dir={dir}>
      <div className="sticky top-0 z-40 glass px-4 py-3">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 text-muted-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-foreground">{t('profile')}</h1>
          <button onClick={handleLogout} className="p-2 text-destructive">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-card border border-border p-6 text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg bg-gray-100">
              {avatar ? (
                <img src={avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-2xl font-bold">
                  {user.full_name?.charAt(0) || '?'}
                </div>
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-primary rounded-full p-1.5 cursor-pointer shadow-lg">
              <Camera className="w-4 h-4 text-white" />
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" disabled={uploading} />
            </label>
            {avatar && (
              <button onClick={handleDeleteAvatar} className="absolute -top-2 -right-2 bg-destructive rounded-full p-1 shadow-lg">
                <Trash2 className="w-3 h-3 text-white" />
              </button>
            )}
          </div>
          {uploading && <p className="text-xs text-muted-foreground -mt-2 mb-2">جاري الرفع...</p>}
          
          <h2 className="text-xl font-bold text-foreground mb-1">{user.full_name}</h2>
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{user.wilaya || 'غير محدد'} · {user.commune || 'غير محدد'}</span>
          </div>
          <div className="flex justify-center">
            <TrustBadge level="active" size="md" />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-border">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{userReports.length}</div>
              <div className="text-xs text-muted-foreground">{t('myReports')}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">
                {user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
              </div>
              <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Calendar className="w-3 h-3" />
                تاريخ الانضمام
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-foreground">{t('myReports')}</h3>
          {userReports.length === 0 ? (
            <EmptyState
              icon={FileText}
              title={t('noPostsYet')}
              description={t('beFirstToReport')}
              actionLabel={t('createFirstReport')}
              onAction={() => navigate('/create-report')}
            />
          ) : (
            userReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                user={{
                  fullName: user.full_name,
                  avatar: avatar,
                  trustLevel: 'active',
                  phone: user.phone,
                }}
              />
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}