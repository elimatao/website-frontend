import { getArticleMetadataList } from "@/lib/content";
import ArticleCard from "./ArticleCard";


export default async function ArticleListTemplate({ route, locale }: { route: string; locale: string }) {
    const articles = getArticleMetadataList(locale, route);
    articles.sort((a, b) => b.lastmod.getTime() - a.lastmod.getTime());
    return (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {articles.map((article) => (
                <ArticleCard key={article.slug} articleData={article} route={route} />
            ))}
        </div>
    );
}
