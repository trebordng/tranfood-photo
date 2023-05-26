import { Album } from "@/type/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";

const AlbumLink: React.FC<Album> = ({ slug, image, name }) => {
  const t = useTranslations("navbar");
  return (
    <Link
      href={slug}
      key={slug}
      arial-label={slug}
      className="lg:w-[calc(50%-16px)] xl:w-[calc(50%-20px)] xl:h-[calc(50%-20px)] max-h-[50%] min-h-256 rounded-lg overflow-hidden relative bg-black hover:bg-none"
    >
      <Image
        src={image.src}
        placeholder="blur"
        priority
        blurDataURL={image.blurDataURL}
        alt={name}
        fill
        sizes="(max-width: 1024px) 100vw 100vh, 100%"
        style={{objectFit:"cover"}}
        className="h-full w-full hover:blur-sm transition opacity-80 hover:opacity-1"
      />
      <h2 className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl uppercase font-bold pointer-events-none">
        {t(name)}
      </h2>
    </Link>
  );
};

export default AlbumLink;
