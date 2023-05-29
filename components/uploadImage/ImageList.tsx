'use client';

import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import React from "react";

interface ImageList {
  list: ImageObject[];
}

interface ImageObject {
  title: string;
  url: string;
  timestamp: Timestamp;
  blurDataURL: string;
}
const ImageList: React.FC<ImageList> = ({ list }) => {
  return (
    <article className="flex flex-col md:flex-wrap md:flex-row gap-16 md:gap-24 flex-auto overflow-x-hidden">
      {list?.map((image: ImageObject) => (
        <div
          key={image.title}
          className="md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] min-h-416 xl:min-h-512 rounded-lg overflow-hidden relative"
        >
          <Image
            src={typeof image.url === "string" ? image.url : ""}
            alt={image.title}
            fill
            sizes="(max-width: 1024px) 100vw 100vh, 100%"
            style={{ objectFit: "cover" }}
            className="h-full w-full hover:blur-sm transition peer"
            placeholder="blur"
            loading="lazy"
            blurDataURL={image?.blurDataURL}
          />
          <h2 className="transition text-center text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold pointer-events-none invisible peer-hover:visible peer                                                            ">
            {image.title}
          </h2>
        </div>
      ))}
    </article>
  );
};

export default ImageList;
