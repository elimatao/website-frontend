import AdaptiveImage from "./components/AdaptiveImage";
import MutedParagraph from "./components/MutedText";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";

function CustomLink({href, locale, ...rest}: any) {
    const isExternal = href.startsWith('http');
    if (isExternal) {
        return <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand underline" {...rest} />;
    }

    return <Link href={href} locale={locale} className="text-brand underline" {...rest} />;
}

export const mdxComponents = {
    h1: (props:any) => <h1 className="text-4xl font-bold my-4" {...props} />,
    h2: (props:any) => <h2 className="text-3xl font-bold my-3" {...props} />,
    h3: (props:any) => <h3 className="text-2xl font-bold my-2" {...props} />,
    h4: (props:any) => <h4 className="text-xl font-bold my-2" {...props} />,
    p: (props:any) => <p className="my-2 leading-7" {...props} />,
    ul: (props: any) => <ul className="list-disc ml-6" {...props} />,
    a: CustomLink,
    MutedParagraph,
    AdaptiveImage,
    Link: CustomLink,
};