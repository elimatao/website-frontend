import { Link } from '@/i18n/routing';
import { TocItem } from '@/lib/toc';

export default function TocSidebar({ headings }: { headings: TocItem[] }) {
    return (
        <aside className="hidden lg:block lg:max-w-64 lg:flex-shrink-0">
            <div className="sticky top-24 self-start border p-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-4">On this page</h2>
                <ul className="">
                    {headings.map((heading) => (
                        <li key={heading.id} className={`pl-${(heading.level - 2) * 4} hover:text-brand active:text-brand transition-colors`}>
                            <Link href={`#${heading.id}`} className='text-sm'>{heading.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}