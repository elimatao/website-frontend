import { Composer } from "@/lib/music-types";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {Badge} from "@/components/ui/badge";
import {useTranslations} from "next-intl";
import {FilterState} from "./RecordingDisplayer";
import {useTransition, startTransition} from "react";
import { initials } from "@/lib/utils";

export default function ComposerFilterer({ composers, activeFilters, onFilterChange }: {
    composers: Composer[];
    activeFilters: FilterState;
    onFilterChange: (filters: FilterState) => void;
}) {
    const t = useTranslations('Music');
    const selectedComposers = activeFilters.composers;
    const [isPending, startTransition] = useTransition();


    const toggleComposer = (id: number) => {
        const nextSelected = selectedComposers.includes(id)
            ? selectedComposers.filter((cId) => cId !== id)
            : [...selectedComposers, id];

        const nextState = { ...activeFilters, composers: nextSelected }; // overwrite only composers array in activeFilters state
        
        onFilterChange(nextState);
        
        // Use transition to keep UI responsive if filtering a large list
        startTransition(() => {
            onFilterChange(nextState);
        });
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <Label className="text-sm font-medium text-muted-foreground">
                    {t('composers')}
                </Label>
                <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                    {selectedComposers.length === 0 ? t('all') : selectedComposers.length}
                </Badge>
            </div>
            
            {/* Responsive Layout: Grid on small, Flex-wrap on larger */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-4">
                {composers.map((composer) => (
                    <div key={composer.id} className="flex items-center space-x-2">
                        <Checkbox 
                            id={`composer-${composer.id}`}
                            checked={activeFilters.composers.includes(composer.id)}
                            onCheckedChange={() => toggleComposer(composer.id)}
                        />
                        <label
                            htmlFor={`composer-${composer.id}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                            {initials(composer.name)} {composer.surname}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
};