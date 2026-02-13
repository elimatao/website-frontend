import { getMusicDatabase, aggregateRecordingsData } from "@/lib/music";
import { AggregateRecording } from "@/lib/music-types";
import { ArticleMetadata } from "@/lib/content";
import ArticleCard from "./ArticleCard";
import RecordingCard from "./music/RecordingCard";
import { getArticleMetadataList } from "@/lib/content";

type NewsItem = AggregateRecording | ArticleMetadata;

export default function NewsList({ route, locale }: { route: string; locale: string }) {
    const music_db = getMusicDatabase();
    const recordings = aggregateRecordingsData(music_db);

    const articles = getArticleMetadataList(locale, route);
    console.log("Articles for locale", locale, "and route", route, ":", articles);
    const content_list = [...recordings, ...articles];
    content_list.sort((a, b) => {
        const dateA = 'recdate' in a ? a.recdate : a.lastmod;
        const dateB = 'recdate' in b ? b.recdate : b.lastmod;
        return dateB.getTime() - dateA.getTime();
    });

    const news_list: NewsItem[] = content_list.slice(0, 4);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {news_list.map((item) => (
                'recdate' in item ? (
                    <RecordingCard key={item.id} recording={item} />
                ) : (
                    <ArticleCard key={item.slug} articleData={item} route={route}/>
                )
            ))}
        </div>
    );
}