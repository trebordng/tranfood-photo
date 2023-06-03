"use client";

import { ImageObject } from "@/type/type";
import React, { useRef } from "react";
import { Dialog } from "@headlessui/react";
import { motion as m } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Modal {
  data: ImageObject[];
  photoId: number;
}

const Modal: React.FC<Modal> = ({ data, photoId }) => {
  let overlayRef = useRef();
  const router = useRouter();
  function handleClose() {
    /* @ts-expect-error router next/navigation*/
    router.push("/food", undefined, { shallow: true });
  }
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-10 inset-0 flex flex-col items-center justify-end pb-16 overflow-hidden gap-16 md:gap-24 lg:gap-32 xl:gap-40">
      <m.div
        onClick={handleClose}
        className="inset-0 bg-black/70 backdrop-blur-2xl fixed z-99"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <Image
        alt={data[photoId].title}
        src={data[photoId].url}
        sizes="100vw"
        height={data[photoId].height}
        width={data[photoId].width}
        placeholder="blur"
        className={`max-h-[70%] max-w-[90%] z-999 w-auto h-auto`}
        blurDataURL={data[photoId].blurDataURL}
      />
      <div className="w-[90%] h-[20%] bg-black relative z-999"></div>
    </div>
  );
};

export default Modal;
