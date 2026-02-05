import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { AggregateRecording } from "@/lib/music-types";
import { YouTubeEmbed } from "@next/third-parties/google";
import { DialogTitle } from "@radix-ui/react-dialog";



export default function YouTubeDialog({ recording }: { recording: AggregateRecording }) {
    const t = useTranslations('Music');
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex justify-between items-center hover:bg-accent hover:cursor-pointer p-2 rounded-md">
                    <span className="text-lg font-medium">{recording.composer_name} {recording.composer_surname}: {recording.piece_title}</span>
                    <span className="ml-4 text-right text-sm text-muted-foreground">
                        {t('recording_date', { date: recording.recdate })}
                    </span>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    {recording.composer_name} {recording.composer_surname}: {recording.piece_title}
                </DialogTitle>
                <YouTubeEmbed videoid={recording.youtube_id} params={recording.youtube_params} js-api/>
            </DialogContent>
        </Dialog>
    )
}