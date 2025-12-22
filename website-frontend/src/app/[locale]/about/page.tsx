import ArticleTemplate from '@/components/ArticleTemplate';
import { setRequestLocale } from 'next-intl/server';

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <ArticleTemplate route="/" slug="about" locale={locale} />
}