import AdaptiveImage from "./components/AdaptiveImage";
import MutedParagraph from "./components/MutedText";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";

function MDXLink(props: any) {
    const currentLocale = useLocale();
    const locale = props.locale ?? currentLocale;
    return <Link locale={locale} className="text-brand underline" {...props} />;
}

export const mdxComponents = {
    h1: (props:any) => <h1 className="text-4xl font-bold my-4" {...props} />,
    h2: (props:any) => <h2 className="text-3xl font-bold my-3" {...props} />,
    h3: (props:any) => <h3 className="text-2xl font-bold my-2" {...props} />,
    p: (props:any) => <p className="my-2 leading-7" {...props} />,
    a: MDXLink,
    MutedParagraph,
    AdaptiveImage,
};