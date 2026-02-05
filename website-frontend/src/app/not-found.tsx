'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { routing } from '@/i18n/routing';

export default function NotFound() {
  const pathname = usePathname();
  const [lang, setLang] = useState<string>(routing.defaultLocale);
  const [isReady, setIsReady] = useState(false); // 1. New state to track readiness

  useEffect(() => {
    const segment = pathname?.split('/')[1];
    const detected = (routing.locales as readonly string[]).includes(segment) 
      ? segment 
      : routing.defaultLocale;
    
    setLang(detected);
    document.documentElement.lang = detected;   
    setIsReady(true);
  }, [pathname]);

  const strings = {
    en: { title: "Page not found", back: "Back to Home" },
    de: { title: "Seite nicht gefunden", back: "Zurück zur Startseite" },
    es: { title: "Página no encontrada", back: "Volver a la página principal" }
  };

  const content = strings[lang as keyof typeof strings] || strings.en;

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        
        <div 
            className={`transition-opacity duration-300 flex flex-col items-center ${
                isReady ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <p className="mb-8 text-muted-foreground">
                {content.title}
            </p>
            
            <Button asChild variant="link" className="border hover:bg-accent">
                <Link href={`/${lang}`}>
                    {content.back}
                </Link>
            </Button>
        </div>
    </div>
  );
}