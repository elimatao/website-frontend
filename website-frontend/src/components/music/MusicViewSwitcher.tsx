import { MusicViewMode } from "./RecordingGrid";
import { LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import next from "next";

const viewModes = [
    { mode: 'grid', label: 'Grid View', icon: <LayoutGrid />},
    { mode: 'list', label: 'List View', icon: <LayoutList />},
]

export default function MusicViewSwitcher({ viewMode, setViewMode }: { viewMode: MusicViewMode; setViewMode: (mode: MusicViewMode) => void }) {
    const currentViewModeIndex = viewModes.findIndex((v) => v.mode === viewMode);
    const currentViewMode = viewModes[currentViewModeIndex];
    const nextViewMode = viewModes[(currentViewModeIndex + 1) % viewModes.length];

    return (
        <Button variant="ghost" size="icon" className="w-fit ml-4 p-2" onClick={() => setViewMode(nextViewMode.mode as MusicViewMode)}>
            {currentViewMode.icon} {currentViewMode.label}
        </Button>
    )
}