"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "../../../utils/firebase";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import Animation from "@/layout/animation";
import ImageList from "@/components/uploadImage/ImageList";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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
import Loading from "@/components/loading";

const UploadImage = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentList, setCurrentList] = useState("Food");
  const lists: string[] = ["Food", "Drink", "Action", "Lifestyle"];
  const router = useRouter();
  const { lists: ListObject, setLists } = ListState();

  const getList = async () => {
    setLoading(false);
    const collectionRef = collection(db, currentList);
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const getList = onSnapshot(q, (snapshot) => {
      console.log("1");
      setLists(
        currentList,
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setLoading(true);
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
  }, [currentList]);

  const uploadImage = async (event: any) => {
    setLoading(false);
    const files = event.target.files;
    for (let index = 0; index < files.length; index++) {
      imageToBase64(URL.createObjectURL(files[index])).then(
        (base64Url: string) => {
          // Create a new Image object with the same source as the original image
          const image = new Image();
          const storage = getStorage();
          const storageRef = ref(storage, files[index].name);

          // 'file' comes from the Blob or File API
          uploadBytes(storageRef, files[index]).then((baseImage) => {
            getDownloadURL(baseImage.ref).then((url) => {
              //load image to create a blur image
              image.onload = async () => {
                const canvas = document.createElement("canvas");
                let width = image.width;
                let height = image.height;
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx?.drawImage(image, 0, 0, width, height);
                // create blur image 0.1 quality
                const blurDataURL = await canvas.toDataURL("image/jpeg", 0.1);
                const collectionRef = collection(db, currentList);
                addDoc(collectionRef, {
                  timestamp: serverTimestamp(),
                  url: url,
                  title: files[index].name.slice(0, -4),
                  blurDataURL: blurDataURL,
                });
                setLoading(true);
              };
              image.src = URL.createObjectURL(files[index]);
            });
          });
        }
      );
    }
  };

  return (
    user && (
      <Animation>
        <section className="grow flex flex-col">
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
                      ? "bg-purple-1 text-white pointer-events-none"
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
          {!loading ? (
            <Loading />
          ) : (
            currentList !== "Blogs" &&
            currentList !== "Recipes" && (
              <ImageList
                list={ListObject[currentList]}
                getList={getList}
                currentList={currentList}
              />
            )
          )}
        </section>
      </Animation>
    )
  );
};

export default UploadImage;
