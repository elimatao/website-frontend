import { AggregateRecording } from "@/lib/music-types";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { initials } from "@/lib/utils";
import { forwardRef } from "react";




const RecordingCard = forwardRef<HTMLDivElement, {recording: AggregateRecording}>(
    ({recording, ...props}, ref) => {
        const t = useTranslations('Music');
        const ytThumbnailUrl = `https://img.youtube.com/vi/${recording.youtube_id}/hqdefault.jpg`;

        return (
            <Card
                ref={ref}
                {...props}
                className="overflow-hidden hover:shadow-lg transition-shadow hover:cursor-pointer">
                <CardHeader className="p-0">
                    <img 
                        src={ytThumbnailUrl} 
                        alt={`Thumbnail for ${recording.piece_title}`} 
                        className="w-full h-auto aspect-video object-cover"
                    />
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
);
RecordingCard.displayName = "RecordingCard";
export default RecordingCard;