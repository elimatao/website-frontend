import { AggregateRecording } from "@/lib/music-types";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { YouTubeEmbed } from '@next/third-parties/google'
import { initials } from "@/lib/utils";


export default function RecordingCard({recording}: {recording: AggregateRecording}) {
    const t = useTranslations('Music');
    return (
        <Card key={recording.id} className="overflow-hidden">
            <CardHeader className="p-0">
                <YouTubeEmbed videoid={recording.youtube_id} params={recording.youtube_params} js-api/>
            </CardHeader>
            <CardContent>
                <CardTitle>{initials(recording.composer_name)} {recording.composer_surname}: {recording.piece_title}</CardTitle>
            </CardContent>
            <CardFooter>
                {t('recording_date', { date: recording.recdate })}
            </CardFooter>
        </Card>
    )
}