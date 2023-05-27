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
  blurDataURL:string;
}
const ImageList: React.FC<ImageList> = ({ list }) => {

  return (
    <article className="flex flex-col md:flex-wrap md:flex-row gap-16 md:gap-24 flex-auto overflow-x-hidden">
      {list?.map((image: ImageObject,index) => (
        <div key={image.title} className="md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] min-h-416 xl:min-h-512 rounded-lg overflow-hidden relative">
          <Image
            src={typeof image.url === "string" ? image.url : ""}
            alt={image.title}
            fill
            sizes="(max-width: 1024px) 100vw 100vh, 100%"
            style={{ objectFit: "cover" }}
            className="h-full w-full hover:blur-sm transition"
            placeholder="blur"
            loading="lazy"
            blurDataURL={image?.blurDataURL}
          />
        </div>
      ))}
    </article>
  );
};

export default ImageList;
