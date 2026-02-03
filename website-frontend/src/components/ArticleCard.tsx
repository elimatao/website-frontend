import { ArticleMetadata } from "@/lib/content";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Link } from "@/i18n/routing";


export default function ArticleCard({ articleData, route }: { articleData: ArticleMetadata, route: string }) {
    console.log("route", route);
    console.log("locale", articleData.locale);
    return (
        <Card key={articleData.slug} className="break-inside-avoid p-4 border hover:shadow-lg transition-shadow">
            <CardHeader>
                {articleData.title}
            </CardHeader>
            <CardContent>
                {articleData.description}
                <Link href={`${route}/${articleData.slug}`} locale={articleData.locale} className="text-brand hover:underline mt-2 inline-block">
                    Read more
                </Link>
            </CardContent>
            <CardFooter>
                {articleData.lastmod.toDateString()}
            </CardFooter>
        </Card>
    )
}