'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GB, DE, ES } from 'country-flag-icons/react/3x2'


const languages = [
  { code: 'en', label: 'English', icon: <GB className="" /> },
  { code: 'es', label: 'Español', icon: <ES className="" /> },
  { code: 'de', label: 'Deutsch', icon: <DE className="" /> },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleLocaleChange(nextLocale: string) {
    // router.replace preserves the current URL segments but swaps the locale
    router.replace(pathname, { locale: nextLocale });
  }

  // Find the current language object for the button display
  const currentLanguage = languages.find((l) => l.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 px-2 hover:cursor-pointer">
          <span className="text-lg">{currentLanguage?.icon}</span>
          <span className="uppercase font-medium">{locale}</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLocaleChange(lang.code)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span className="text-xl">{lang.icon}</span>
            <span className={locale === lang.code ? 'font-bold' : ''}>
              {lang.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}