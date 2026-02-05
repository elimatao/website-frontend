// Updates the <html lang=""> attribute based on the current locale.
'use client';
import { useEffect } from 'react';

export default function DocumentLangUpdater({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}