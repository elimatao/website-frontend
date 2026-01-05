import { INITIAL_FILTERS } from "./RecordingDisplayer";
import { useTranslations } from "next-intl";
import { FilterState } from "./RecordingDisplayer";
import { useTransition, useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import YearInput from "./YearRangeInput";

export default function RecordingDateFilterer({ activeFilters, onFilterChange }: {
    activeFilters: FilterState;
    onFilterChange: (filters: FilterState) => void;
}) {
    const t = useTranslations('Music');
    const [isPending, startTransition] = useTransition();

    const handleFilterUpdate = (nextState: FilterState) => {
        startTransition(() => {
            onFilterChange(nextState);
        });
    };

    // Updates state from Slider (Array of numbers)
    const handleSliderChange = (values: number[]) => {
        handleFilterUpdate({ ...activeFilters, yearRange: values as [number, number] });
    };

    // Updates state from individual number inputs
    const handleInputChange = (index: 0 | 1, value: number) => {
        const otherValue = index === 0 ? activeFilters.yearRange[1] : activeFilters.yearRange[0];
        const nextRange: [number, number] = [Math.min(value, otherValue), Math.max(value, otherValue)];
        handleFilterUpdate({ ...activeFilters, yearRange: nextRange });
    };

    return (
        <div className="">
            <Label className="text-sm font-medium text-muted-foreground tracking-wider">
                {t('recording_year')}
            </Label>
            
            {/* The Visual Slider */}
            <div className="px-2 pt-2">
                <Slider
                    defaultValue={[INITIAL_FILTERS.yearRange[0], INITIAL_FILTERS.yearRange[1]]}
                    value={[activeFilters.yearRange[0], activeFilters.yearRange[1]]}
                    min={INITIAL_FILTERS.yearRange[0]}
                    max={INITIAL_FILTERS.yearRange[1]}
                    step={1}
                    onValueChange={handleSliderChange}
                    className="py-4"
                />
            </div>
            <div className="flex items-center justify-between">
                <div className="flex md:flex-wrap md:space-y-1 lg:space-y-0 space-x-1 items-center">
                    <span className="text-[10px] uppercase text-muted-foreground font-bold">{t('from')}</span>
                    <YearInput 
                        value={activeFilters.yearRange[0]}
                        range={INITIAL_FILTERS.yearRange}
                        onChange={(val) => handleInputChange(0, val)}
                    />
                </div>
                
                <div className="flex md:flex-wrap md:space-y-1 lg:space-y-0 space-x-1 items-center">
                    <span className="text-[10px] uppercase text-muted-foreground font-bold">{t('to')}</span>
                    <YearInput 
                        value={activeFilters.yearRange[1]}
                        range={INITIAL_FILTERS.yearRange}
                        onChange={(val) => handleInputChange(1, val)}
                    />
                </div>
            </div>
        </div>
    );
}