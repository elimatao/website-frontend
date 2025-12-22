import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
import en from '../../messages/en.json';

export const routing = defineRouting({
  locales: ['en', 'es', 'de'],
  defaultLocale: 'en'
});

// Lightweight wrappers for Next.js navigation (Link, useRouter, etc.)
export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);

export type Messages = typeof en;