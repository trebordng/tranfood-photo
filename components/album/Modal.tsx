"use client";

import { ImageObject } from "@/type/type";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useKeypress from "react-use-keypress";
import SharedModal from "./SharedModal";
import { Dialog } from "@headlessui/react";

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

  useEffect(() => {
    document.getElementById("navbar")?.classList.remove("sticky");
  }, []);
  function handleClose() {
    /* @ts-expect-error router next/navigation*/
    router.replace(`/${list}`, `/${list}`, { shallow: true });
    if (onClose) {
      onClose();
    }
    document.getElementById("navbar")?.classList.add("sticky");
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
    <Dialog
      static
      open={true}
      onClose={handleClose}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <SharedModal
        index={curIndex}
        direction={direction}
        data={data}
        changePhotoId={changePhotoId}
        closeModal={handleClose}
        curIndex={curIndex}
      />
    </Dialog>
  );
};

export default Modal;
