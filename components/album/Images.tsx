"use client";

import { ListState } from "@/context/CanvasContext";
import { ImageObject } from "@/type/type";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import Modal from "./Modal";
import { useLastViewedPhoto } from "@/utils/useLastViewedPhoto";

interface Images {
  data: ImageObject[];
  list: string;
}
const Images: React.FC<Images> = ({ data, list }) => {
  const { setLists } = ListState();
  const searchParams = useSearchParams();
  const photoId = searchParams.get("photoId");

  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setLists(list, data);
  }, []);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <React.Fragment>
      {photoId && (
        <Modal
          photoId={Number(photoId)}
          data={data}
          list={list.toLowerCase()}
          onClose={() => {
            setLastViewedPhoto(Number(photoId));
          }}
        />
      )}
      {data.map((image: ImageObject, index) => (
        <Link
          aria-label={image.url}
          key={image.url}
          shallow
          href={`/${list.toLowerCase()}/?photoId=${index}`}
          as={`/${list.toLowerCase()}/?photoId=${index}`}
          className="md:w-[calc(50%-12px)] cursor-zoom-in lg:w-[calc(33.33%-16px)] h-416 xl:h-512 rounded-lg overflow-hidden relative bg-black"
        >
          <Image
            src={image.url}
            alt={image.title}
            fill
            sizes="(max-width: 640px) 100vw,
            (max-width: 1280px) 50%,
            (max-width: 1536px) 33%,
            25vw"
            style={{ objectFit: "cover" }}
            className="hover:blur-sm hover:opacity-80 transition peer"
            placeholder="blur"
            loading={index < 4 ? "eager" : "lazy"}
            blurDataURL={image?.blurDataURL}
            ref={index === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
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
