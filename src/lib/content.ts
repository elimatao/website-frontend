// src/lib/content.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import { mdxComponents } from '@/mdx-components';
import { extractHeadings, TocItem } from './toc';

export interface ArticleMetadata {
  title: string;
  date: Date;
  lastmod: Date;
  description?: string;
  moddescription?: string;
  draft?: boolean;
  slug: string;
  wordCount: number;
  locale?: string;
  featured_image?: string;
}

export async function getArticle(route: string, slug: string, locale: string): Promise<{ metadata: ArticleMetadata; content: React.ReactNode; headings: TocItem[] } | undefined> {
    const fullPath = path.join(process.cwd(), `src/content/${route}/${slug}.${locale}.mdx`);

    if (!fs.existsSync(fullPath)) {
        return undefined;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // This separates 'data' (frontmatter) from 'content' (the body)
    const { content, frontmatter } = await compileMDX<ArticleMetadata>({
        source: fileContents,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkMath],
                rehypePlugins: [rehypeSlug, rehypeKatex],
                format: 'mdx',
            }
        },
        components: mdxComponents,  
    });

    frontmatter.wordCount = fileContents.split(/\s+/).length; // update regex to skip frontmatter

    const headings = extractHeadings(fileContents);

    return { metadata: frontmatter, content: content, headings: headings };
}

export function getArticleMetadataList(locale: string, route: string): ArticleMetadata[] {
    /**
     * Searches for all content files in the given language and other languages if no localized version exists.
     */
    const dirPath = path.join(process.cwd(), `src/content/${route}`);
    if (!fs.existsSync(dirPath)) {
        return [];
    }
    
    const files = fs.readdirSync(dirPath, { recursive: true }) as string[];
    const mdxFiles = files.filter(file => 
        file.endsWith(`.mdx`)
    );
    const localeSpecificFiles = mdxFiles.filter(file => 
        file.endsWith(`.${locale}.mdx`)
    );

    const strippedLocaleSpecificFiles = new Set<string>(localeSpecificFiles.map(file => 
        file.replace(`.${locale}.mdx`, '')
    ));

    const otherFilesInOtherLanguages = mdxFiles.filter(file => {
        const strippedFile = file.replace(/\.[a-z]{2}\.mdx$/, '');
        if(!strippedLocaleSpecificFiles.has(strippedFile)) {
            strippedLocaleSpecificFiles.add(strippedFile);
            return true;
        }
        return false;
    });
    const filesToProcess = [...localeSpecificFiles, ...otherFilesInOtherLanguages];
    console.log("Files to process for route", route, "and locale", locale, ":", filesToProcess);

    const articles = filesToProcess.map(file => {
        const fullPath = path.join(dirPath, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        data.wordCount = content.split(/\s+/).length;
        data.locale = file.match(/\.([a-z]{2})\.mdx$/)?.[1] || locale;
        data.lastmod = data.lastmod ?? data.date;
        data.slug = file.replace(/\.([a-z]{2})\.mdx$/, '')
                        .replace('.mdx', '')
                        .replace(/(^|\/)\([^)]+\)/g, ''); // slug is now the whole thing starting after route
        return data as ArticleMetadata;
    }).filter(article => !article.draft);
    return articles;
}

export function getAllPostSlugs(locale: string, route: string): string[] {
    const dirPath = path.join(process.cwd(), `src/content/${route}`);
    const files = fs.readdirSync(dirPath);
    return files.filter(file => file.endsWith(`.${locale}.mdx`))
                .map(file => file.replace(`.${locale}.mdx`, ''));
}

export function getOtherAvailableLocalesForSlug(route: string, slug: string, currentLocale: string): string[] {
    const dirPath = path.join(process.cwd(), `src/content/${route}`);
    const files = fs.readdirSync(dirPath);
    const regex = new RegExp(`^${slug}\\.([a-z]{2})\\.mdx$`);
    return files.map(file => {
        const match = file.match(regex);
        if (match) {
            return match[1]; // Return the locale code
        }
        return null;
    }).filter(locale => locale !== currentLocale && locale !== null) as string[];
}