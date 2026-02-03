import { ArticleMetadata } from "@/lib/content";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";


export default function ArticleCard({ articleData, route }: { articleData: ArticleMetadata, route: string }) {
    const t = useTranslations('Home');
    console.log("route:", route);
    console.log("article name", articleData.title, "locale:", articleData.locale);
    return (
        <Link 
            href={`/${route}/${articleData.slug}`} 
            locale={articleData.locale} 
            className="block break-inside-avoid h-full"
        >
            <Card className="border hover:shadow-lg  transition-shadow hover:cursor-pointer h-full">
                <CardHeader className="p-0 gap-0 border-0 border-b-1 border-accent rounded-t-xl overflow-hidden">
                    {articleData.featured_image && (
                        <img src={articleData.featured_image} alt={articleData.title} />
                    )}
                </CardHeader>
                <CardContent className="text-center h-full flex flex-col justify-around">
                    <h2 className="font-bold">{articleData.title}</h2>
                    
                    { articleData.description && (
                        <p>{articleData.description}</p>
                    )}
                    { articleData.moddescription && (
                        <p><span className="italic text-brand">{t("new")}: </span>{articleData.moddescription}</p>
                    )}
                </CardContent>
                <CardFooter>
                    {articleData.lastmod.toDateString()}
                </CardFooter>
            </Card>
        </Link>
    )
}