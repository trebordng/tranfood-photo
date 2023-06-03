import { ImageObject } from "@/type/type";
import React, { useRef } from "react";
import { Dialog } from "@headlessui/react";
import { motion as m } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Modal = ({ data, photoId }) => {
  let overlayRef = useRef();
  const router = useRouter();
  console.log(photoId);
  function handleClose() {
    router.push("/food", undefined, { shallow: true });
  }
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-10 inset-0 flex flex-col items-center justify-center overflow-hidden gap-16">
      <m.div
        onClick={handleClose}
        className="inset-0 bg-black/70 backdrop-blur-2xl fixed z-99"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <div className="w-[90%] h-[70%] relative z-999 flex justify-center items-center">
        <Image
          alt={data[photoId].title}
          src={data[photoId].url}
          sizes="(max-width: 640px) 100vw,
            (max-width: 1280px) 50%,
            (max-width: 1536px) 33%,
            25vw"
          height={data[photoId].height/2}
          width={data[photoId].width/2}
          placeholder="blur"
          blurDataURL={data[photoId].blurDataURL}
        />
      </div>
      <div className="w-[90%] h-[20%] bg-black relative z-999"></div>
    </div>
  );
};

export default Modal;
