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
import { MusicSortMode } from './RecordingGrid';
import { CalendarArrowUp, CalendarArrowDown, ArrowDownAZ, ArrowDownZA } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function MusicSortSwitcher({ sortMode, setSortMode }: { sortMode: MusicSortMode; setSortMode: React.Dispatch<React.SetStateAction<MusicSortMode>> }) {
  const t = useTranslations('Music');
  const sortModes = [
    { mode: 'date_desc', label: t('date_desc'), icon: <CalendarArrowUp />},
    { mode: 'date_asc', label: t('date_asc'), icon: <CalendarArrowDown />},
    { mode: 'title_asc', label: t('title_asc'), icon: <ArrowDownAZ />},
    { mode: 'title_desc', label: t('title_desc'), icon: <ArrowDownZA />},
    { mode: 'composer_asc', label: t('composer_asc'), icon: <ArrowDownAZ />},
    { mode: 'composer_desc', label: t('composer_desc'), icon: <ArrowDownZA />},
  ];

  const currentSortMode = sortModes.find((s) => s.mode === sortMode);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 ml-4 p-2 hover:cursor-pointer">
          <span className="text-lg">{currentSortMode?.icon}</span>
          <span className="font-medium">{currentSortMode?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {sortModes.map((sortMode) => (
          <DropdownMenuItem
            key={sortMode.mode}
            onClick={() => setSortMode(sortMode.mode as MusicSortMode)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span className="text-xl">{sortMode.icon}</span>
            <span className={currentSortMode?.mode === sortMode.mode ? 'font-bold' : ''}>
              {sortMode.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}