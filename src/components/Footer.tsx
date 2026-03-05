import {getTranslations} from "next-intl/server";
import { Link } from "@/i18n/routing";



export default async function Footer() {
    const t = await getTranslations('Footer');

    return (
        <footer className="text-center p-4 grid grid-cols-2 md:grid-cols-4 gap-2 mt-auto border-t text-sm">
            <Link href="/cs/about_page">{t("about_page")}</Link>
            <Link locale="en" href="/cs/changelog">{t("changelog")}</Link>
            <Link href="/legal">{t("legal")}</Link>
            <Link href="/privacy">{t("privacy")}</Link>
        </footer>
    );
}