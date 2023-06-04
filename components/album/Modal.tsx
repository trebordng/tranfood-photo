"use client";

import { ImageObject } from "@/type/type";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useKeypress from "react-use-keypress";
import SharedModal from "./SharedModal";

interface Modal {
  data: ImageObject[];
  photoId: number;
}

const Modal: React.FC<Modal> = ({ data, photoId }) => {
  const router = useRouter();
  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(photoId);

  // document.body.style.overflow = 'hidden';
  function handleClose() {
    /* @ts-expect-error router next/navigation*/
    router.push("/food", "/food", { shallow: true });
    // document.body.style.removeProperty('overflow');
  }

  function changePhotoId(newVal: number) {
    if (newVal > photoId) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurIndex(newVal);

    router.push(
      `/food?photoId=${newVal}`,
      `/food?photoId=${newVal}`,
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
