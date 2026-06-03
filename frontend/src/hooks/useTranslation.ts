import { useAppStore } from '@/stores/appStore';
import { translations } from '@/i18n/translations';
import { useCallback } from 'react';

export function useTranslation() {
  const language = useAppStore((s) => s.language);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      let text = translations[language]?.[key] || translations.ar[key] || key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, String(v));
        });
      }
      return text;
    },
    [language]
  );

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return { t, language, dir };
}
