'use client';

import Animation from "@/layout/animation";
import { db } from "@/utils/firebase";
import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import React from "react";
import Images from "./Images";
import Image, { StaticImageData } from "next/image";
import { ImageObject } from "@/type/type";

interface AlbumPage {
  list: string;
  color: string;
  quote: string;
  author?: string;
  image: StaticImageData;
}
const getList = async (list: string) => {
  const collectionRef = collection(db, list);
  const q = query(collectionRef, orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  var result: ImageObject[] = [];

  for (let index = 0; index < querySnapshot.docs.length; index++) {
    // doc.data() is never undefined for query doc snapshots
    const data = querySnapshot.docs[index].data() as DocumentData;

    const image: ImageObject = {
      pageId: data.pageId,
      url: data.url,
      title: data.title,
      blurDataURL: data.blurDataURL,
      width: data.width,
      height: data.height
    };
    result.push(image);
  }
  return result;
};

/* @ts-expect-error Async Server Component */
const AlbumPage: React.FC<AlbumPage> = async ({
  list,
  color,
  quote,
  author,
  image,
}) => {
  // get list from firebase to render
  const data = await getList(list);

  return (
    <Animation>
      <section className="flex flex-col md:flex-wrap md:flex-row gap-16 md:gap-24 flex-auto">
        <article
          className={`gap-16 p-16 md:p-24 lg:32 xl:p-40 md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] h-416 xl:h-512 rounded-lg overflow-hidden text-black relative shadow ${color} flex flex-col justify-center items-center text-center`}
        >
          <Image
            src={image.src}
            alt={list}
            fill
            sizes="(max-width: 640px) 100vw,
            (max-width: 1280px) 50%,
            (max-width: 1536px) 33%,
            25vw"      
            style={{ objectFit: "cover",transform: 'translate3d(0, 0, 0)'  }}
            className="h-full w-full transition relative opacity-10"
            placeholder="blur"
            loading="lazy"
            blurDataURL={image?.blurDataURL}
          />
          <p className="text-2xl font-semibold uppercase relative">{list}</p>
          <div className="relative">
            <i className="font-bold text-xl ">{quote}</i>
            <p className="font-semibold text-md ">{author}</p>
          </div>
        </article>
        <Images data={data} list={list} />
      </section>
    </Animation>
  );
};

export default AlbumPage;
