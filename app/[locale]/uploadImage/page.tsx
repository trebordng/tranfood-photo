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
import { ListState } from "@/context/CanvasContext";
import Loading from "@/components/loading";
import ListTab from "@/components/uploadImage/ListTab";
import UtilButton from "@/components/uploadImage/UtilButtons";
import { ImageObject } from "@/type/type";

const UploadImage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentList, setCurrentList] = useState("Food");
  const lists: string[] = ["Food", "Drink", "Action", "Lifestyle"];
  const { lists: listObject, setLists } = ListState();
  const [activeList, setActiveList] = useState<string[]>([]);
  const [uploadCounter, setUploadCounter] = useState<number | null>(null);
  const [totalCounter, setTotalCounter] = useState<number | null>(null);

  // get list from firebase to render
  const getList = async () => {
    const collectionRef = collection(db, currentList);
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const getList = await onSnapshot(q, (snapshot) => {
      setLists(
        currentList,
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    return getList;
  };

  //user authentication
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      async (authUser: User | null) => {
        if (authUser?.email === "tranfoodphoto.vn@gmail.com") {
          setLoading(false);
          setUser(authUser);
          await getList();
          setTimeout(() => {
            setLoading(true);
          }, 100);
        } else {
          setUser(null);
          router.push("/login");
        }
      }
    );
    return unsubscribe;
  }, [currentList]);

  const checkName = async (name: string) => {
    let counter: number = 0;
    if (listObject[currentList].length === 0) {
      return false;
    } else {
      await listObject[currentList].forEach((image: ImageObject) => {
        if (image.title === name) {
          counter = counter + 1;
        }
      });
      if (counter === 0) {
        return false;
      } else {
        alert(name + " already exists");
        return true;
      }
    }
  };

  //upload images to firebase
  const uploadImage = async (event: any) => {
    const files = event.target.files;
    setTotalCounter(files.length);
    for (let index = 0; index < files.length; index++) {
      if (index === 0) {
        setLoading(false);
      }
      setUploadCounter(index + 1);
      // Create a new Image object with the same source as the original image
      const image = new Image();
      const storage = getStorage();
      const storageRef = ref(storage, files[index].name);
      const alreadyUploaded = await checkName(files[index].name.slice(0, -4));
      if (!alreadyUploaded) {
        // 'file' comes from the Blob or File API
        await uploadBytes(storageRef, files[index]).then((baseImage) => {
          getDownloadURL(baseImage.ref).then((url) => {
            //load image to create a blur image
            image.onload = () => {
              const canvas = document.createElement("canvas");
              let width = image.width;
              let height = image.height;
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext("2d");
              ctx?.drawImage(image, 0, 0, width, height);
              // create blur image 0.1 quality
              const blurDataURL = canvas.toDataURL("image/jpeg", 0.1);
              const collectionRef = collection(db, currentList);
              addDoc(collectionRef, {
                timestamp: serverTimestamp(),
                url: url,
                title: files[index].name.slice(0, -4),
                blurDataURL: blurDataURL,
              });
              if (index === files.length - 1) {
                console.log(index);
                event.target.value = "";
                setLoading(true);
                setUploadCounter(null);
              }
            };
            image.src = URL.createObjectURL(files[index]);
          });
        });
      } else if (index === files.length - 1) {
        event.target.value = "";
        setLoading(true);
      }
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
            <Loading
              uploadCounter={uploadCounter}
              totalCounter={totalCounter}
            />
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
