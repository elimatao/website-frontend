import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { AggregateRecording } from "@/lib/music-types";
import { YouTubeEmbed } from "@next/third-parties/google";
import { DialogTitle } from "@radix-ui/react-dialog";



export default function YouTubeDialog({ recording, children }: { recording: AggregateRecording; children: React.ReactNode }) {
    const t = useTranslations('Music');
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
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