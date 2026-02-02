import ArticleTemplate from '@/components/ArticleTemplate';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getAllPostSlugs } from '@/lib/content';

export const dynamicParams = false; // This prevents the "missing param" error

export async function generateStaticParams() {
    const paths = routing.locales.flatMap((locale) => {
        const slugs = getAllPostSlugs(locale, '/');
        // For each locale, we return an array of objects like { locale: 'en', slug: 'my-post' }
        console.log("Slugs for locale", locale, ":", slugs);
        return slugs.map((slug) => ({
            locale: locale,
            slug: slug,
        }));
    });
    return paths;
}

export default async function CSArticlePage({params}: {params: Promise<{locale: string, slug: string}>}) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    return <ArticleTemplate route="/" slug={slug} locale={locale} />
}