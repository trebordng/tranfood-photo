"use client";
import { PostData } from "@/type/type";
import { AnimatePresence } from "framer-motion";
import { motion as m } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import lady from "@/public/images/pretty-lady.jpg";
import RelatedModal from "./RelatedModal";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

interface Modal {
  data: PostData[];
  postId: string;
  list: string;
}

const Modal: React.FC<Modal> = ({ data, postId, list }) => {
  const [currentPost, setCurrentPost] = useState<any>();
  const [total, setTotal] = useState<number>();
  const router = useRouter();

  useEffect(() => {
    const current = data.find((post) => post.id === postId);
    setCurrentPost(current);
    const postLength = Object.keys(current?.post || ({} as object)).length;
    setTotal((postLength - 1) / 2);
  }, [postId]);
  const renderDescImg = () => {
    const items = [];
    if (total) {
      for (let i = 1; i < total; i++) {
        const description = currentPost.post[`description` + i];
        const image = currentPost.post[`image` + i];
        items.push(
          <p
            className="text-black font-regular text-lg leading-7 whitespace-pre-line"
            key={"description" + i}
          >
            {description}
          </p>
        );
        if (image.url !== "") {
          items.push(
            <div
              className="relative max-w-640 block h-416 xl:h-512"
              key={"image" + i}
            >
              <Image
                src={image.url}
                placeholder="blur"
                blurDataURL={image.blurDataURL}
                alt={"image" + i}
                fill
                sizes="100vw"
                className="w-full h-full object-cover rounded-md shadow-2xl"
              />
            </div>
          );
        }
      }
    }

    return items;
  };

  function handleClose() {
    /* @ts-expect-error router next/navigation*/
    router.replace(`/${list.toLowerCase()}`, `/${list.toLowerCase()}`, {
      shallow: true,
    });
  }
  return (
    <AnimatePresence>
      {/* back drop */}
      <m.div
        key={list + postId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.4,
          ease: "linear",
        }}
        exit={{ opacity: 1 }}
        className="fixed w-full h-full z-10 bg-black/70 inset-0 backdrop-blur-sm"
        onClick={handleClose}
      />
      {/* post */}
      <article className="w-full flex flex-col items-center gap-16 md:gap-24 lg:gap-32 xl:gap-40 z-99 relative bg-white p-16 md:p-24 lg:p-32 xl:p-40 rounded-md">
        {/* close button */}
        <button
          onClick={handleClose}
          className="p-8 fixed invisible xl:visible xl:top-40 xl:left-40 bg-black/50 z-999 rounded-full hover:rotate-90 hover:bg-black/30 transition"
        >
          <IoMdClose className="text-xl text-white" />
        </button>
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-black">
          {currentPost?.post.title}
        </h1>
        {/* Information */}
        <div className="relative w-full flex flex-col md:flex-row md:justify-around items-center gap-16 md:gap-24 lg:gap-32 xl:gap-40 xl:w-1024 p-16 md:p-24 lg:p-32 xl:p-40 rounded-md">
          {/* background */}
          <div className="w-full h-full md:h-[70%] bg-gradient-to-b from-purple to-blue rounded-md absolute top-0 left-0 -z-1" />
          {/* Content */}
          {currentPost?.post.imageTitle.blurDataURL && (
            <Image
              alt={currentPost?.post.title}
              src={currentPost?.post.imageTitle.url}
              placeholder={"blur"}
              blurDataURL={currentPost?.post.imageTitle.blurDataURL}
              width={412}
              height={412}
              sizes="50vw"
              className="relative w-full h-256 md:w-368 md:h-368 xl:w-416 xl:h-416 object-cover rounded-md basis-1 lg:basis-1/2"
            />
          )}
          <div className="text-black bg-white/40 backdrop-blur-xl p-16 rounded-md shadow-2xl">
            <div className="flex md:flex-row flex-col gap-16 items-center basis-1/2">
              <Image
                className="object-cover rounded-full w-64 h-64 object-top relative"
                src={lady.src}
                blurDataURL={lady.blurDataURL}
                placeholder="blur"
                width="64"
                height="64"
                sizes="64px"
                alt="pretty lady"
              />
              <p className="font-bold text-lg ">Diep Tran</p>
            </div>
            <p className="font-bold text-lg mt-16">
              Published: {currentPost?.timestamp}
            </p>
          </div>
        </div>
        {/* Body */}
        <div className="relative w-full xl:w-1024 flex flex-col gap-16 md:gap-24 lg:gap-32 xl:gap-40">
          {renderDescImg()} {/* Related Modal */}
          <RelatedModal
            data={data.filter((post: PostData) => post.id !== postId)}
            list={list}
          />
        </div>
      </article>
    </AnimatePresence>
  );
};

export default Modal;
