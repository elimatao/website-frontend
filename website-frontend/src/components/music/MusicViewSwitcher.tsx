import { MusicViewMode } from "./RecordingGrid";
import { LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import next from "next";
import { useTranslations } from "next-intl";

export default function MusicViewSwitcher({ viewMode, setViewMode }: { viewMode: MusicViewMode; setViewMode: (mode: MusicViewMode) => void }) {
    const t = useTranslations('Music');
    const viewModes = [
        { mode: 'grid', label: t('grid_view'), icon: <LayoutGrid />},
        { mode: 'list', label: t('list_view'), icon: <LayoutList />},
    ]

    const currentViewModeIndex = viewModes.findIndex((v) => v.mode === viewMode);
    const currentViewMode = viewModes[currentViewModeIndex];
    const nextViewMode = viewModes[(currentViewModeIndex + 1) % viewModes.length];

    return (
        <Button variant="ghost" size="icon" className="w-fit ml-4 p-2 hover:cursor-pointer" onClick={() => setViewMode(nextViewMode.mode as MusicViewMode)}>
            {currentViewMode.icon} {currentViewMode.label}
        </Button>
    )
}