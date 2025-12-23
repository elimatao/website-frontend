import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getArticleMetadataList } from "@/lib/content";
import { Link } from "@/i18n/routing";


export default async function ArticleListTemplate({ route, locale }: { route: string; locale: string }) {
    const articles = getArticleMetadataList(locale, route);
    articles.sort((a, b) => b.date.getTime() - a.date.getTime());
    console.log(articles);
    return (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {articles.map((article) => (
                <Card key={article.slug} className="break-inside-avoid mb-4 p-4 border rounded-lg hover:shadow-lg transition-shadow">
                    <CardHeader>
                        {article.title}
                    </CardHeader>
                    <CardContent>
                        <p>{article.date.toDateString()}</p>
                        {article.description}
                        <Link href={`/${route}/${article.slug}`} locale={article.locale} className="text-brand hover:underline mt-2 inline-block">
                            Read more
                        </Link>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
