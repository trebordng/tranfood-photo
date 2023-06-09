"use client";
import { IoMdClose, IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { BiLinkExternal } from "react-icons/bi";
import { ImageObject } from "@/type/type";
import React, { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion as m } from "framer-motion";
import { range } from "@/utils/range";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import { variants } from "@/utils/variants";
import Link from "next/link";

interface SharedModal {
  index: number;
  data: ImageObject[];
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  direction?: number;
  curIndex: number;
}
const SharedModal: React.FC<SharedModal> = ({
  index,
  data,
  changePhotoId,
  closeModal,
  direction,
  curIndex,
}) => {
  const [loading, setLoading] = useState(false);

  let filteredImages = data.filter((image: ImageObject) => {
    return range(index - 15, index + 15).includes(image.pageId);
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (curIndex < data.length - 1) {
        changePhotoId(curIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (curIndex > 0) {
        changePhotoId(curIndex - 1);
      }
    },
    trackMouse: true,
  });

  return (
    <React.Fragment>
      {/* buttons */}
      {loading && (
        <article>
          <button
            onClick={closeModal}
            className="p-8 fixed top-4 left-4 xl:top-16 xl:left-16 bg-black/50 z-9999 rounded-full hover:rotate-90 hover:bg-black/30 transition"
          >
            <IoMdClose className="text-xl text-white" />
          </button>
          <Link
            href={data[index].url}
            target="_blank"
            rel="noopener"
            className="p-8 fixed top-4 right-4 xl:top-16 xl:right-16 bg-black/50 z-9999 rounded-full hover:bg-black/30 transition"
          >
            <BiLinkExternal className="text-xl text-white" />
          </Link>
          {index > 0 && (
            <button
              onClick={() => changePhotoId(index - 1)}
              className="p-8 fixed left-4 top-[50%] xl:left-16 bg-black/50 z-9999 rounded-full hover:bg-black/30 transition -translate-y-1/2"
            >
              <IoMdArrowBack className="text-xl text-white" />
            </button>
          )}
          {index < data.length - 1 && (
            <button
              onClick={() => changePhotoId(index + 1)}
              className=" p-8 fixed right-4 top-[50%] xl:right-16 bg-black/50 z-9999 rounded-full hover:bg-black/30 transition -translate-y-1/2"
            >
              <IoMdArrowForward className="text-xl text-white" />
            </button>
          )}
        </article>
      )}

      <article
        className="fixed top-0 w-full h-full left-0 z-10 inset-0"
        {...handlers}
      >
        {/* main image */}
        <AnimatePresence initial={false} custom={direction}>
          <m.div
            className="top-16 md:top-24 lg:top-32 xl:top-40 fixed h-[calc(100%-5.25rem-48px)] md:h-[calc(100%-5.25rem-72px)] lg:h-[calc(100%-5.25rem-96px)] xl:h-[calc(100%-5.25rem-120px)] w-full flex flex-col gap-16 items-center justify-center"
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <m.div
              onClick={closeModal}
              className="inset-0 fixed z-99"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <p className="z-999 relative text-xl text-white text-center">
              {data[index].title}
            </p>
            <Image
              alt={data[index].title}
              src={data[index].url}
              sizes="100vw"
              height={data[index].height}
              width={data[index].width}
              placeholder="blur"
              className={`max-h-[95%] max-w-[100%] z-999 w-auto`}
              blurDataURL={data[index].blurDataURL}
              onLoadingComplete={() => setLoading(true)}
              priority
            />
          </m.div>
        </AnimatePresence>
      </article>
      {/* navigation */}
      {loading && (
        <article className="fixed inset-x-0  bottom-0 z-999 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
          <m.div
            initial={false}
            className="mx-auto my-16 md:my-24 lg:my-32 xl:my-40  flex aspect-[3/2] h-14"
          >
            <AnimatePresence initial={false}>
              {filteredImages.map(({ url, blurDataURL, pageId }) => (
                <m.button
                  initial={{
                    width: "0%",
                    x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                  }}
                  animate={{
                    scale: pageId === index ? 1.25 : 1,
                    width: "100%",
                    x: `${Math.max(index * -100, 15 * -100)}%`,
                  }}
                  exit={{ width: "0%" }}
                  onClick={() => changePhotoId(pageId)}
                  key={pageId}
                  className={`${
                    pageId === index
                      ? "z-20 rounded-md shadow shadow-black/50"
                      : "z-10"
                  } ${pageId === 0 ? "rounded-l-md" : ""} ${
                    pageId === data.length - 1 ? "rounded-r-md" : ""
                  } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                >
                  <Image
                    alt="small photos on the bottom"
                    width={180}
                    height={120}
                    className={`${
                      pageId === index
                        ? "brightness-110 hover:brightness-110"
                        : "brightness-50 contrast-125 hover:brightness-75"
                    } h-full transform object-cover transition`}
                    src={url}
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    sizes="30vw"
                  />
                </m.button>
              ))}
            </AnimatePresence>
          </m.div>
        </article>
      )}
    </React.Fragment>
  );
};

export default SharedModal;
