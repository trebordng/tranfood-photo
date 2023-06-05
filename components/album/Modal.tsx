"use client";

import { ImageObject } from "@/type/type";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useKeypress from "react-use-keypress";
import SharedModal from "./SharedModal";
import { Dialog } from "@headlessui/react";
import { MotionConfig, motion as m } from "framer-motion";

interface Modal {
  data: ImageObject[];
  photoId: number;
  list: string;
  onClose?: () => void;
}

const Modal: React.FC<Modal> = ({ data, photoId, list, onClose }) => {
  const router = useRouter();
  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(photoId);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const navbar = document.getElementById("navbar");

    navbar?.classList.remove("sticky");

    return () => {
      navbar?.classList.add("sticky");
    };
  }, []);

  function handleClose() {
    /* @ts-expect-error router next/navigation*/
    router.replace(`/${list}`, `/${list}`, { shallow: true });
    if (onClose) {
      onClose();
    }
  }

  function changePhotoId(newVal: number) {
    if (newVal > photoId) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurIndex(newVal);

    router.replace(
      `/${list}?photoId=${newVal}`,
      `/${list}?photoId=${newVal}`,
      /* @ts-expect-error router next/navigation*/
      { shallow: true }
    );
  }

  useKeypress("ArrowRight", () => {
    if (photoId + 1 < data.length) {
      changePhotoId(photoId + 1);
    }
  });

  useKeypress("ArrowLeft", () => {
    if (photoId > 0) {
      changePhotoId(photoId - 1);
    }
  });

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 20 },
        opacity: { duration: 0.4 },
      }}
    >
      <Dialog
        static
        open={true}
        initialFocus={overlayRef}
        onClose={handleClose}
        className="fixed inset-0 z-10 flex items-center justify-center"
      >
        <Dialog.Overlay
          ref={overlayRef}
          as={m.div}
          key="backdrop"
          className="fixed inset-0 z-10 bg-black/70 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <SharedModal
          index={curIndex}
          direction={direction}
          data={data}
          changePhotoId={changePhotoId}
          closeModal={handleClose}
          curIndex={curIndex}
        />
      </Dialog>
    </MotionConfig>
  );
};

export default Modal;
