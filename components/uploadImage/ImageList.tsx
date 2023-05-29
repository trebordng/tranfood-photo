"use client";

import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import React, { SetStateAction } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { ImageObject } from "@/type/type";

interface ImageList {
  listObject: ImageObject[];
  activeList: string[];
  setActiveList: React.Dispatch<SetStateAction<string[]>>;
  currentList: string;
}

const ImageList: React.FC<ImageList> = ({
  listObject,
  currentList,
  activeList,
  setActiveList,
}) => {
  const deleteImage = (image: ImageObject) => {
    const storage = getStorage();
    const desertRef = ref(storage, image.url);
    // Delete the file
    deleteObject(desertRef)
      .then(async () => {
        await deleteDoc(doc(db, currentList, image.id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setActiveImage = (image: ImageObject) => {
    if (activeList.includes(image.title)) {
      setActiveList((prevList) =>
        prevList.filter((title) => title !== image.title)
      );
    } else {
      setActiveList((prevList) => [...prevList, image.title]);
    }
  };
  return (
    <article className="flex flex-col md:flex-wrap md:flex-row gap-16 md:gap-24 flex-auto overflow-x-hidden">
      {listObject?.map((image: ImageObject) => (
        <div
          onClick={() => setActiveImage(image)}
          key={image.title}
          className={`${
            activeList.includes(image.title) && "border-4 border-purple-1"
          } md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] min-h-416 xl:min-h-512 rounded-lg overflow-hidden relative cursor-pointer`}
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
          <AiFillCloseCircle
            className="text-xl text-white absolute top-8 left-8 cursor-pointer hover:scale-110"
            onClick={() => deleteImage(image)}
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
