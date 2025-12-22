import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/mdx-components';
import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server';
import { getArticle } from '@/lib/content';
import { extractHeadings, TocItem } from '@/lib/toc';
import rehypeSlug from 'rehype-slug';
import TocSidebar from './TocSidebar';
import MutedParagraph from './MutedText';

export default async function ArticleTemplate({ route, slug, locale }: { route: string; slug: string; locale: string }) {
    setRequestLocale(locale);
    const t = await getTranslations('Article');

    const { metadata, content } = getArticle(route, slug, locale);
    
    const format = await getFormatter();
    const dateString = metadata.date instanceof Date
        ? format.dateTime(metadata.date, { dateStyle: 'long' }) 
        : metadata.date;

    const headings: TocItem[] = extractHeadings(content);
    return (
        <div className="relative flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto px-4 py-8">
            {metadata.wordCount > 500 && headings.length > 1 && <TocSidebar headings={headings} />}
            <div className='flex-1 min-w-0'>
                <p className="text-center text-4xl font-bold mb-2">{metadata.title}</p>
                <MutedParagraph>{t('last_updated', { date: dateString })}</MutedParagraph>
                <MDXRemote 
                    source={content} 
                    components={mdxComponents} 
                    options={{ mdxOptions: {
                        rehypePlugins: [rehypeSlug]
                    }}}
                />
                <div className="clear-both" />
            </div>
        </div>
    )
};