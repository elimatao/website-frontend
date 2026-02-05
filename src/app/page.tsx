'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "@/app/globals.css";
import LoadingSpinner from '@/components/LoadingSpinner';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // 1. Check browser language (optional)
    const browserLang = navigator.language.split('-')[0];
    const targetLocale = (routing.locales as readonly string[]).includes(browserLang) ? browserLang : routing.defaultLocale;

    // 2. Redirect to the localized version
    router.replace(`/${targetLocale}`);
  }, [router]);

  return (
    <LoadingSpinner />
  );
}