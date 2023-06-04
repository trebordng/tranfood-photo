"use client";

import { ImageObject } from "@/type/type";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useKeypress from "react-use-keypress";
import SharedModal from "./SharedModal";

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

  // document.body.style.overflow = "hidden";
  function handleClose() {
    console.log(`/${list}`);
    /* @ts-expect-error router next/navigation*/
    router.push(`/${list}`, `/${list}`, { shallow: true });
    if (onClose) {
      onClose();
    }
    // document.body.style.removeProperty("overflow");
  }

  function changePhotoId(newVal: number) {
    if (newVal > photoId) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurIndex(newVal);

    router.push(
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
    <SharedModal
      index={curIndex}
      direction={direction}
      data={data}
      changePhotoId={changePhotoId}
      closeModal={handleClose}
      curIndex={curIndex}
    />
  );
};

export default Modal;
