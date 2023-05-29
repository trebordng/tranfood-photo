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
import ListTab from "@/components/uploadImage/ListTab";
import UploadButton from "@/components/uploadImage/UtilButtons";
import UtilButton from "@/components/uploadImage/UtilButtons";

const UploadImage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentList, setCurrentList] = useState("Food");
  const lists: string[] = ["Food", "Drink", "Action", "Lifestyle"];
  const { lists: listObject, setLists } = ListState();
  const [activeList, setActiveList] = useState<string[]>([]);
  // get list from firebase to render
  const getList = async () => {
    setLoading(false);
    const collectionRef = collection(db, currentList);
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const getList = onSnapshot(q, (snapshot) => {
      setLists(
        currentList,
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setLoading(true);
    });
    return getList;
  };

  //user authentication
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

  //upload images to firebase
  const uploadImage = async (event: any) => {
    setLoading(false);
    const files = event.target.files;
    for (let index = 0; index < files.length; index++) {
      // Create a new Image object with the same source as the original image
      const image = new Image();
      const storage = getStorage();
      const storageRef = ref(storage, files[index].name);
      // 'file' comes from the Blob or File API
      await uploadBytes(storageRef, files[index]).then((baseImage) => {
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
            await addDoc(collectionRef, {
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
  };

  return (
    user && (
      <Animation>
        <section className="grow flex flex-col">
          <article className="mb-16 md:mb-24 lg:mb-32 xl:mb-40">
            {/* Switching Tabs */}
            <div className="flex gap-16 justify-center flex-wrap">
              {lists.map((list) => (
                <ListTab
                  key={list}
                  list={list}
                  currentList={currentList}
                  setCurrentList={setCurrentList}
                />
              ))}
            </div>
            {/* Upload Button */}
            <UtilButton
              listObject={listObject[currentList]}
              activeList={activeList}
              setActiveList={setActiveList}
              currentList={currentList}
              upload={
                currentList !== "Blogs" && currentList !== "Recipes"
                  ? uploadImage
                  : uploadImage
              }
            />
          </article>
          {/* Display Image and Loading interface */}
          {!loading ? (
            <Loading />
          ) : (
            currentList !== "Blogs" &&
            currentList !== "Recipes" && (
              <ImageList
                listObject={listObject[currentList]}
                currentList={currentList}
                activeList={activeList}
                setActiveList={setActiveList}
              />
            )
          )}
        </section>
      </Animation>
    )
  );
};

export default UploadImage;
