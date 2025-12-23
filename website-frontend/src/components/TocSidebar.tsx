import { Link } from '@/i18n/routing';
import { TocItem } from '@/lib/toc';

export default function TocSidebar({ tocTitle, headings }: { tocTitle: string, headings: TocItem[] }) {
    const indentations: Record<number, string> = {
        2: 'pl-0',
        3: 'pl-4',
        4: 'pl-8',
        5: 'pl-12'
    };

    return (
        <aside className="hidden lg:block lg:max-w-48 lg:flex-shrink-0">
            <div className="sticky top-24 self-start border p-3 rounded-md">
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-4">{tocTitle}</h2>
                <ul className="">
                    {headings.map((heading) => (
                        <li key={heading.id} className={`${indentations[heading.level]} hover:text-brand transition-colors`}>
                            <Link href={`#${heading.id}`} className='text-sm'>{heading.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}