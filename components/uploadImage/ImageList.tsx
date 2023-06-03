"use client";

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
    const urlRef = ref(storage, image.url);
    // Delete the file
    deleteObject(urlRef)
      .then(async () => {
        setActiveList((prevList) =>
          prevList.filter((title) => title !== image.title)
        );
        if (image.id) {
          await deleteDoc(doc(db, currentList, image.id));
        }
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
    <article className="flex flex-col md:flex-wrap md:flex-row gap-16 md:gap-24 flex-auto max-w-full">
      {listObject?.map((image: ImageObject) => (
        <div
          onClick={() => setActiveImage(image)}
          key={image.title}
          className={`${
            activeList.includes(image.title) && "border-4 border-purple-1"
          } md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] h-416 xl:h-512 rounded-lg overflow-hidden relative cursor-pointer`}
        >
          <Image
            src={typeof image.url === "string" ? image.url : ""}
            alt={image.title}
            fill
            sizes="(max-width: 640px) 100vw,
            (max-width: 1280px) 50%,
            (max-width: 1536px) 33%,
            25vw"
            style={{ objectFit: "cover" }}
            className="hover:blur-sm transition peer"
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
