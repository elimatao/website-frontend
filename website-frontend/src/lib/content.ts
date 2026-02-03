// src/lib/content.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

export function getArticle(route: string, slug: string, locale: string): { metadata: ArticleMetadata; content: string } | undefined {
    const fullPath = path.join(process.cwd(), `src/content/${route}/${slug}.${locale}.mdx`);

    if (!fs.existsSync(fullPath)) {
        return undefined;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // This separates 'data' (frontmatter) from 'content' (the body)
    const { data, content } = matter(fileContents);
    data.wordCount = content.split(/\s+/).length;

    return { metadata: data as ArticleMetadata, content };
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

    const articles = filesToProcess.map(file => {
        const fullPath = path.join(dirPath, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        data.wordCount = content.split(/\s+/).length;
        data.locale = file.match(/\.([a-z]{2})\.mdx$/)?.[1] || locale;
        data.lastmod = data.lastmod ?? data.date;
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