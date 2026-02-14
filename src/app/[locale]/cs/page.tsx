import { getTranslations, setRequestLocale } from "next-intl/server";
import ArticleListTemplate from "@/components/ArticleListTemplate";

export default async function CSOverviewPage({params}: {params: Promise<{locale: string}>}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('CsListPage')

    return (
        <div className="max-w-6xl mx-auto px-8 pb-6">
            <h1 className="text-center text-4xl font-bold my-16">{t('title')}</h1>
            <ArticleListTemplate route="cs" locale={locale} />
        </div>
    );
}