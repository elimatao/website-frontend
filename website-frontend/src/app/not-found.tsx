'use client'; // Mark as client component

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '@/app/globals.css';
import { Button } from '@/components/ui/button';
import { ThemeProvider } from '@/components/theme-provider';

export default function NotFound() {
  const pathname = usePathname();
  // Simple check: does the URL start with /de?
  const isDe = pathname?.startsWith('/de');
  const isEs = pathname?.startsWith('/es');

  return (
    <html lang={isDe ? "de" : isEs ? "es" : "en"} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                
                <p className="mb-8">
                {isDe ? "Seite nicht gefunden" : isEs ? "Página no encontrada" : "Page not found"}
                </p>
                
                <Link href={isDe ? "/de" : isEs ? "/es" : "/en"}>
                <Button variant="link" className="border hover:bg-accent">
                    {isDe ? "Zurück zur Startseite" : isEs ? "Volver a la página principal" : "Back to Home"}
                </Button>
                </Link>
            </div>
        </ThemeProvider>
      </body>
    </html>
  );
}