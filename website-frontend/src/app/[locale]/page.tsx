import {setRequestLocale, getTranslations} from 'next-intl/server';
import NewsList from '@/components/NewsList';

import Image from "next/image";

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Home');

  return (
    <div className="text-center">
      <div className="relative w-full">
        <Image 
          src="/handsBw.jpeg" 
          alt="Description" 
          width={2296}
          height={1113}
          className="w-full h-auto"
        />
        <div id="main-overlay" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 px-4 py-2 rounded-md text-white">
          <h1 className="text-xl md:text-4xl font-bold mb-2">Elia Doumerc</h1>
          <p className="text-base md:text-lg whitespace-nowrap">{t('subtitle')}</p>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-lg md:text-2xl font-bold m-3">{t("welcome_title")}</h1>
        <p className="text-sm md:text-base">{t("welcome_description")}</p>
      </div>
      <div className="p-4 bg-accent">
        <h2 className="text-lg md:text-2xl mb-4">{t("news_title")}</h2>
        <NewsList locale={locale} route="" />
      </div>
    </div>
  );
}
