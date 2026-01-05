import { getTranslations, setRequestLocale } from "next-intl/server";
import { getMusicDatabase, aggregateRecordingsData } from "@/lib/music";
import RecordingDisplayer from "@/components/music/RecordingDisplayer";

export default async function MusicPage({params}: {params: Promise<{locale: string}>}) {
    const {locale} = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Music');
    const musicDb = getMusicDatabase();
    const aggregateRecordings = aggregateRecordingsData(musicDb);

    return (
        <div className="max-w-7xl mx-auto px-8">
            <h1 className="text-4xl text-center my-16">{t('title')}</h1>
            <RecordingDisplayer recordings={aggregateRecordings} composers={musicDb.composers} />
        </div>
    );
}