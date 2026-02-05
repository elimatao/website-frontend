import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {routing, Messages} from '@/i18n/routing';
import {setRequestLocale} from 'next-intl/server';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import DocumentLangUpdater from "@/components/DocumentLangUpdater";



export const dynamicParams = false; // This prevents the "missing param" error

export const metadata: Metadata = {
  title: { default: "Elia Doumerc", template: "%s | Elia Doumerc"},
  description: "Website of Elia Doumerc, pianist and computer scientist",

};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const { Navigation, Music, LEDsGame } = messages as Messages;
  const clientMessages = { Navigation, Music, LEDsGame };

  return (
    <>
      <DocumentLangUpdater locale={locale} />
      <NextIntlClientProvider messages={clientMessages}>
        <Header />
        <div className="flex flex-col min-h-screen pt-16 max-w-7xl mx-auto">
          {children}
          <Footer />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
