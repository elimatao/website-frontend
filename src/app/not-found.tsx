'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { routing } from '@/i18n/routing';

export default function NotFound() {
  const pathname = usePathname();
  const router = useRouter();
  
  const [lang, setLang] = useState<string>(routing.defaultLocale);
  const [isReady, setIsReady] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  // Define translations
  const strings = {
    en: { 
      title: "Page not found", 
      back: "Back to Home",
      redirectTitle: "Page not translated or not found",
      redirectMsg: "Redirecting you to the overview...",
      redirectingTo: "Moving to:"
    },
    de: { 
      title: "Seite nicht gefunden", 
      back: "Zurück zur Startseite",
      redirectTitle: "Seite nicht übersetzt oder nicht gefunden",
      redirectMsg: "Leite zur Übersicht weiter...",
      redirectingTo: "Weiterleitung nach:"
    },
    es: { 
      title: "Página no encontrada", 
      back: "Volver a la página principal",
      redirectTitle: "Página no traducida o no encontrada",
      redirectMsg: "Redirigiendo a la vista general...",
      redirectingTo: "Moviendo a:"
    }
  };

  useEffect(() => {
    if (!pathname) return;

    // 1. Detect Language
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];
    const detected = (routing.locales as readonly string[]).includes(firstSegment) 
      ? firstSegment 
      : routing.defaultLocale;
    
    setLang(detected);
    document.documentElement.lang = detected;

    // 2. Redirect Logic
    // If we are deeper than 2 levels (e.g. /en/blog/missing-slug), 
    // it implies we are on a specific item that might not exist in this language.
    // We redirect to the parent (e.g. /en/blog).
    if (segments.length > 2) {
      segments.pop(); // Remove the missing slug
      const parentPath = `/${segments.join('/')}`;
      
      setRedirectPath(parentPath);

      // Wait 3 seconds so the user sees the message, then redirect
      const timer = setTimeout(() => {
        router.replace(parentPath);
      }, 3000);

      return () => clearTimeout(timer);
    }
    
    // Only set ready if we are NOT redirecting immediately, 
    // or if we want to show the redirect UI
    setIsReady(true);

  }, [pathname, router]);

  const content = strings[lang as keyof typeof strings] || strings.en;

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      
      {/* Container with fade-in effect */}
      <div 
        className={`transition-opacity duration-500 flex flex-col items-center max-w-md ${
          isReady || redirectPath ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {redirectPath ? (
           // --- REDIRECT UI ---
           <>
             <h1 className="text-3xl font-bold mb-4">{content.redirectTitle}</h1>
             <p className="mb-4 text-muted-foreground animate-pulse">
               {content.redirectMsg}
             </p>
             <div className="text-sm bg-muted px-3 py-1 rounded border">
                <span className="opacity-70 mr-2">{content.redirectingTo}</span>
                <code className="font-mono text-brand">{redirectPath}</code>
             </div>
           </>
        ) : (
           // --- STANDARD 404 UI ---
           <>
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="mb-8 text-muted-foreground">
              {content.title}
            </p>
            
            <Button asChild variant="link" className="border hover:bg-accent">
              <Link href={`/${lang}`}>
                {content.back}
              </Link>
            </Button>
           </>
        )}
      </div>
    </div>
  );
}