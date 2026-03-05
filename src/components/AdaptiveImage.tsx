// components/mdx/AdaptiveImage.tsx
/* eslint-disable @next/next/no-img-element */

interface MDXImageProps {
  src: string;
  alt: string;
  title?: string; // Used for layout and caption
  width?: number; // Injected by plugin
  height?: number; // Injected by plugin
}


// TODO: check dimensions on small screens
export function MDXImage({ src, alt, title, width, height }: MDXImageProps) {
  // 1. Logic for Layouts
  let containerClass = "w-fit max-w-full my-2 relative mx-auto "; // Default full width
  
  if (title?.includes("float-right")) {
    // Float Right: 1/3 width
    containerClass += "sm:float-right sm:max-w-[50%] lg:max-w-[33%] sm:ml-6 mb-4";
  } else if (title?.includes("float-left")) {
    // Float Left: 1/3 width
    containerClass += "sm:float-left sm:max-w-[50%] lg:max-w-[33%] sm:mr-6 mb-4";
  }

  // 2. Logic for Captions (strip the keywords)
  const cleanCaption = title
    ?.replace("float-right", "")
    .replace("float-left", "")
    .trim();

  return (
    <figure className={containerClass}>
      <img
        src={src}
        alt={alt || ""}
        width={width}   // Injected by plugin
        height={height} // Injected by plugin
        className="rounded-lg h-auto w-auto mx-auto max-h-[70vh] object-contain overflow-hidden" // w-full fills the figure container, max-h-[70vh] limits height to 70% of viewport
        sizes="(max-width: 768px) 100vw, 33vw" // Optimization for Next.js
      />
      {cleanCaption && (
        <figcaption className="text-center text-sm text-gray-500 mt-2">
          {cleanCaption}
        </figcaption>
      )}
    </figure>
  );
}