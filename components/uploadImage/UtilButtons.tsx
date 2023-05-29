import { ImageObject } from "@/type/type";
import { db } from "@/utils/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import React, { SetStateAction, useCallback } from "react";

interface UtilButton {
  listObject: ImageObject[];
  activeList: string[];
  upload: (event: React.ChangeEvent) => void;
  currentList: string;
  setActiveList: React.Dispatch<SetStateAction<string[]>>;
}
const UtilButton: React.FC<UtilButton> = ({
  listObject,
  activeList,
  upload,
  currentList,
  setActiveList,
}) => {
  const deleteImage = (image: ImageObject) => {
    const storage = getStorage();

    const desertRef = ref(storage, image.url);

    // Delete the file
    deleteObject(desertRef)
      .then(async () => {
        setActiveList((prevList) =>
          prevList.filter((title) => title !== image.title)
        );
        await deleteDoc(doc(db, currentList, image.id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteImages = () => {
    activeList.forEach((imageTitle) => {
      listObject.forEach((image) => {
        if (image.title === imageTitle) {
          deleteImage(image);
        }
      });
    });
  };

  const handleUpload = useCallback(
    (event: React.ChangeEvent) => {
      // call the upload function with the event argument
      upload(event);
    },
    [upload]
  );

  return (
    <div className="mt-16 md:mt-24 lg:mt-32 xl:mt-40">
      <input
        type="file"
        id="file-button"
        hidden
        onChange={handleUpload}
        accept={"image/*"}
        multiple
      />
      <label
        htmlFor="file-button"
        className="hover:bg-gray-100 cursor-pointer py-8 px-24 shadow-xl rounded-md border-gray-100 border inline-block"
      >
        Upload files
      </label>
      <button
        disabled={activeList.length === 0}
        onClick={deleteImages}
        className={` ${
          activeList.length === 0 && "pointer-events-none opacity-50"
        } ml-16 hover:bg-gray-100 cursor-pointer py-8 px-24 shadow-xl rounded-md border-gray-100 border`}
      >
        Remove Selected
      </button>
    </div>
  );
};

export default UtilButton;
