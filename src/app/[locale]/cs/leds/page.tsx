import { getArticle } from "@/lib/content";
import LedGame from "./LedGame";
import { notFound } from "next/navigation";

export default async function LedGamePage({params}: {params: Promise<{locale: string}>}) {
    const { locale } = await params;
    const article = getArticle("cs/(leds)", "leds", locale);
        if (!article) {
            notFound();
        }
        const { metadata, content } = article;

    return (
            <div className="container mx-auto max-w-3xl border rounded-lg overflow-clip m-6">
                {metadata.featured_image && (
                <img 
                    src={metadata.featured_image} 
                    alt="LEDs" 
                    className="mx-auto max-w-full h-auto" 
                />
                )}
                <LedGame featuredImage={metadata.featured_image} instructions={content} />
            </div>
    )
}