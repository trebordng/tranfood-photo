import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ImageData {
  url: string;
  title: string;
  blurDataURL: string;
}
interface Images {
  data: ImageData[];
}
const Images: React.FC<Images> = ({ data }) => {
  return (
    <React.Fragment>
      {data.map((image: ImageData) => (
        <Link
          aria-label={image.url}
          key={image.url}
          href=""
          className="md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] h-416 xl:h-512 rounded-lg overflow-hidden relative bg-black"
        >
          <Image
            src={image.url}
            alt={image.title}
            fill
            quality={80}
            sizes="(max-width: 1024px) 100vw 100vh, 100%"
            style={{ objectFit: "cover" }}
            className="h-full w-full hover:blur-sm hover:opacity-80 transition peer"
            placeholder="blur"
            loading="lazy"
            blurDataURL={image?.blurDataURL}
          />
          <h2 className="transition text-center text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold pointer-events-none invisible peer-hover:visible peer                                                            ">
            {image.title}
          </h2>
        </Link>
      ))}
    </React.Fragment>
  );
};

export default Images;
