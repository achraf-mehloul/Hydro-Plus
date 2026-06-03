import { useEffect } from 'react';
import { useAppStore } from '@/stores/appStore';

export function useOffline() {
  const setOnline = useAppStore((s) => s.setOnline);
  const setSyncStatus = useAppStore((s) => s.setSyncStatus);

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      setSyncStatus('syncing');
      setTimeout(() => setSyncStatus('updated'), 2000);
    };
    const handleOffline = () => {
      setOnline(false);
      setSyncStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOnline, setSyncStatus]);
}
