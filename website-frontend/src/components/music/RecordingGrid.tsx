import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { YouTubeEmbed } from '@next/third-parties/google'
import { useState, useMemo } from "react";
import { MusicSortSwitcher } from "./MusicSortSwitcher";
import { AggregateRecording } from "@/lib/music-types";
import { initials } from "@/lib/utils";
import MusicViewSwitcher from "./MusicViewSwitcher";

export type MusicSortMode = 'date_desc' | 'date_asc' | 'title_asc' | 'title_desc' | 'composer_asc' | 'composer_desc';
export type MusicViewMode = 'grid' | 'list';

export default function RecordingGrid({ recordings }: {recordings: AggregateRecording[]}) {
    const t = useTranslations('Music');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [sortMode, setSortMode] = useState<'date_desc' | 'date_asc' | 'title_asc' | 'title_desc' | 'composer_asc' | 'composer_desc'>('date_desc');

    const sortedRecordings = useMemo(() => {
        const sorted = [...recordings];
        switch (sortMode) {
            case 'date_desc':
                sorted.sort((a, b) => +b.recdate - +a.recdate);
                break;
            case 'date_asc':
                sorted.sort((a, b) => +a.recdate - +b.recdate);
                break;
            case 'title_asc':
                sorted.sort((a, b) => a.piece_title.localeCompare(b.piece_title));
                break;
            case 'title_desc':
                sorted.sort((a, b) => b.piece_title.localeCompare(a.piece_title));
                break;
            case 'composer_asc':
                sorted.sort((a, b) => a.composer_surname.localeCompare(b.composer_surname));
                break;
            case 'composer_desc':
                sorted.sort((a, b) => b.composer_surname.localeCompare(a.composer_surname));
                break;
        }
        return sorted;
    }, [recordings, sortMode]);

    return (
        <div className="md:basis-3/4 lg:basis-5/7 shrink-0">
            <div className="flex justify-between items-center mb-4 border rounded-lg p-2">
                <span className="">
                    {t('filtered_recordings_count', { count: sortedRecordings.length })}
                </span>
                <span className="">
                    <MusicViewSwitcher viewMode={viewMode} setViewMode={setViewMode} />
                    <MusicSortSwitcher sortMode={sortMode} setSortMode={setSortMode} />
                </span>
            </div>
            { viewMode === 'grid' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedRecordings.map((recording) => (
                        <Card key={recording.id} className="overflow-hidden">
                            <CardHeader className="p-0">
                                <YouTubeEmbed videoid={recording.youtube_id} params={recording.youtube_params}/>
                            </CardHeader>
                            <CardContent>
                                <CardTitle>{initials(recording.composer_name)} {recording.composer_surname}: {recording.piece_title}</CardTitle>
                            </CardContent>
                            <CardFooter>
                                {t('recording_date', { date: recording.recdate })}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
            { viewMode === 'list' && (
                <div className="border rounded-xl p-2 space-y-6">
                    {sortedRecordings.map((recording) => (
                        <div key={recording.id} className="flex justify-between items-center">
                            <span className="text-lg font-medium">{recording.composer_name} {recording.composer_surname}: {recording.piece_title}</span>
                            <span className="ml-4 text-right text-sm text-muted-foreground">
                                {t('recording_date', { date: recording.recdate })}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}