"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "../../../utils/firebase";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import Animation from "@/layout/animation";
import ImageList from "@/components/uploadImage/ImageList";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import imageToBase64 from "image-to-base64/browser";
import { ListState } from "@/context/CanvasContext";

const UploadImage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentList, setCurrentList] = useState("Food");
  const lists: string[] = ["Food", "Drink", "Action", "Lifestyle"];
  const router = useRouter();
  const { lists: ListObject, setLists } = ListState();

  const getList = async () => {
    const collectionRef = collection(db, currentList);
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const getList = onSnapshot(q, (snapshot) => {
      setLists(
        currentList,
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    return getList;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser: User | null) => {
      if (authUser?.email === "tranfoodphoto.vn@gmail.com") {
        setUser(authUser);
        getList();
      } else {
        setUser(null);
        router.push("/login");
      }
    });
    return unsubscribe;
  }, []);

  const uploadImage = async (event: any) => {
    const files = event.target.files;
    for (let index = 0; index < files.length; index++) {
      imageToBase64(URL.createObjectURL(files[index])).then(
        (base64Url: string) => {
          // Create a new Image object with the same source as the original image
          const image = new Image();

          image.onload = async () => {
            const canvas = document.createElement("canvas");
            let width = image.width;
            let height = image.height;
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(image, 0, 0, width, height);
            const blurDataURL = await canvas.toDataURL("image/jpeg", 0.1);
            const collectionRef = collection(db, currentList);
            addDoc(collectionRef, {
              timestamp: serverTimestamp(),
              url: "data:image/jpeg;base64," + base64Url,
              title: files[index].name,
              blurDataURL: blurDataURL,
            });
          };
          image.src = URL.createObjectURL(files[index]);
        }
        // console.log(blurDataURL);
      );
    }
  };

  return (
    user && (
      <Animation>
        <section className="flex-auto">
          <article className="mb-16 md:mb-24 lg:mb-32 xl:mb-40">
            <div className="flex gap-16 justify-center flex-wrap">
              {lists.map((list) => (
                <button
                  key={list}
                  id={list + `-upload-tab`}
                  onClick={() => {
                    setCurrentList(list);
                  }}
                  className={`transition flex-auto shadow-xl px-24 py-8 rounded-md font-semibold text-center border-gray-100 border  ${
                    currentList === list
                      ? "bg-orange-500 pointer-events-none"
                      : "cursor-pointer hover:bg-gray-100"
                  } `}
                >
                  {list}
                </button>
              ))}
            </div>
            {currentList !== "Blogs" && currentList !== "Recipes" ? (
              <div className="mt-16 md:mt-24 lg:mt-32 xl:mt-40">
                <input
                  type="file"
                  id="file-button"
                  hidden
                  onChange={(event) => uploadImage(event)}
                  accept={"image/*"}
                  multiple
                />
                <label
                  htmlFor="file-button"
                  className="hover:bg-gray-100 cursor-pointer py-8 px-24 shadow-xl rounded-md border-gray-100 border inline-block"
                >
                  Upload files
                </label>
              </div>
            ) : (
              <></>
            )}
          </article>
          {currentList !== "Blogs" && currentList !== "Recipes" && (
            <ImageList list={ListObject[currentList]} />
          )}
        </section>
      </Animation>
    )
  );
};

export default UploadImage;
