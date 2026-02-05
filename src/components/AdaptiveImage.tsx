// components/mdx/AdaptiveImage.tsx
import Image from 'next/image';

interface AdaptiveImageProps {
  src: string;
  alt: string;
  caption?: string;
  // 'wide' (full width), 'left' (narrow, wrap right), 'right' (narrow, wrap left)
  layout?: 'wide' | 'left' | 'right';
}

export default function AdaptiveImage({ src, alt, caption, layout = 'wide' }: AdaptiveImageProps) {
  // Define classes based on the layout choice
  const containerClasses = {
    wide: "w-full my-8",
    left: "float-left mr-8 mb-4 w-full sm:w-1/2 lg:w-1/3",
    right: "float-right ml-8 mb-4 w-full sm:w-1/2 lg:w-1/3"
  };

  return (
    <figure className={`${containerClasses[layout]} clear-none`}>
      <div className={`relative overflow-hidden rounded-xl border shadow-sm ${
        layout === 'wide' ? 'aspect-[21/9] max-h-[500px]' : 'aspect-[3/4]'
      }`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={layout === 'wide' ? "100vw" : "(max-width: 768px) 100vw, 400px"}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs italic text-gray-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}