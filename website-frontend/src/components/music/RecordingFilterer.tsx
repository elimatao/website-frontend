'use client';

import { Composer } from "@/lib/music-types";
import { useTranslations } from "next-intl";
import { useState, useTransition, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox"; // Assuming shadcn
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FilterState } from "./RecordingDisplayer";
import ComposerFilterer from "./ComposerFilterer";
import RecordingDateFilterer from "./RecordingDateFilterer";

export default function RecordingFilterer({ 
  composers,
  onFilterChange,
  defaultFilters,
  activeFilters
}: { 
  composers: Composer[],
  onFilterChange: (filters: FilterState) => void,
  defaultFilters: FilterState,
  activeFilters: FilterState
}) {
    const t = useTranslations('Music');

    const clearFilters = () => {
        onFilterChange(defaultFilters);
    };

    return (
        <div className="p-2 mb-4 border rounded-xl bg-card text-card-foreground shadow-sm md:basis-1/4 lg:basis-2/7 md:flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">{t('filter_section_title')}</h3>
                {activeFilters.composers.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 lg:px-3">
                        {t('reset_filters')}
                    </Button>
                )}
            </div>

            {/* Filter Sections Container - Flexible for future additions */}
            <div className="grid grid-cols-1 gap-6">
                <ComposerFilterer composers={composers} activeFilters={activeFilters} onFilterChange={onFilterChange} />
                <RecordingDateFilterer initialFilters={defaultFilters} activeFilters={activeFilters} onFilterChange={onFilterChange} />
            </div>
        </div>
    );
}