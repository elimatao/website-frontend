import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server';
import { getArticle } from '@/lib/content';
import { notFound } from 'next/navigation';
import 'katex/dist/katex.min.css';
import TocSidebar from './TocSidebar';
import MutedParagraph from './MutedText';

export default async function ArticleTemplate({ route, slug, locale }: { route: string; slug: string; locale: string }) {
    setRequestLocale(locale);
    const t = await getTranslations('Article');

    const article = await getArticle(route, slug, locale);
    if (!article) {
        notFound();
    }
    const { metadata, content, headings } = article;
  
    const format = await getFormatter();
    const parsedDate = new Date(metadata.lastmod);
    const dateString = !isNaN(parsedDate.getTime()) 
        ? format.dateTime(parsedDate, { dateStyle: 'long' }) 
        : metadata.lastmod;

    return (
        <div className="relative flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto px-4 py-8">
            {metadata.wordCount > 500 && article.headings.length > 1 && <TocSidebar tocTitle={t('toc_title')} headings={article.headings} />}
            <div className='flex-1 min-w-0'>
                <h1 className="text-center text-4xl font-bold mb-4">{metadata.title}</h1>
                <MutedParagraph>{t('last_updated', { date: dateString })}</MutedParagraph>
                {content}
                <div className="clear-both" />
            </div>
        </div>
    )
};