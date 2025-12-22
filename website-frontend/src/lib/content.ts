// src/lib/content.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ArticleMetadata {
  title: string;
  date: string | Date;
  lastmod?: string | Date;
  description?: string;
  draft?: boolean;
  wordCount: number;
}

export function getArticle(route: string, slug: string, locale: string) {
  const fullPath = path.join(process.cwd(), `src/content/${route}/${slug}.${locale}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // This separates 'data' (frontmatter) from 'content' (the body)
  const { data, content } = matter(fileContents);
  data.wordCount = content.split(/\s+/).length;
  console.log("word count", data.wordCount);

  return { metadata: data as ArticleMetadata, content };
}