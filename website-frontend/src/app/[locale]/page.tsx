import {setRequestLocale, getTranslations} from 'next-intl/server';

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
          <h1 className="text-4xl font-bold mb-2">Elia Doumerc</h1>
          <p className="text-lg">{t('subtitle')}</p>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl m-3">Welcome to my Website!</h1>
        <p>Welcome to the homepage!</p>
        <p className="m-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima nostrum quo quas autem sit doloribus eum illum consectetur commodi totam odio debitis cupiditate delectus sunt harum, placeat optio voluptatibus mollitia? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste laudantium consequatur minus quia at magni suscipit distinctio a eum hic ea velit accusantium quis, fugit nostrum obcaecati molestiae incidunt illum.</p>
        <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque porro harum voluptas enim quasi veniam nesciunt doloribus similique adipisci, tenetur veritatis sit voluptates eum! Quo corrupti commodi ut incidunt magnam.</p>
        <div className="h-100"></div>
      </div>
    </div>
  );
}
