// src/lib/toc.ts
export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(content: string): TocItem[] {
  // Regex to find Markdown headers (## Header)
  const headingRegex = /^(#{2,3})\s+(.*)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length; // number of #
    const text = match[2];
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-');    // Replace spaces with hyphens

    headings.push({ id, text, level });
  }

  return headings;
}