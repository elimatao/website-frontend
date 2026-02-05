import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {routing, Messages} from '@/i18n/routing';
import {setRequestLocale} from 'next-intl/server';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={clientMessages}>
            <Header />
            <div className="flex flex-col min-h-screen pt-16 max-w-7xl mx-auto">
              {children}
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
