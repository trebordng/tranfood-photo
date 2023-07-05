"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "../../../utils/firebase";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import Animation from "@/layout/animation";
import ImageList from "@/components/upload/ImageList";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ListState } from "@/context/CanvasContext";
import Loading from "@/components/loading";
import ListTab from "@/components/upload/ListTab";
import ImageButton from "@/components/upload/ImageButtons";
import { ImageObject, Post } from "@/type/type";
import PostList from "@/components/upload/PostList";
import PostButtons from "@/components/upload/PostButtons";

const UploadImage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentList, setCurrentList] = useState("Food");
  const lists: string[] = [
    "Food",
    "Drink",
    "Action",
    "Lifestyle",
    "Blogs",
    "Recipes",
  ];
  const { lists: listObject, setLists } = ListState();
  const [activeList, setActiveList] = useState<string[]>([]);
  const [uploadCounter, setUploadCounter] = useState<number | null>(null);
  const [totalCounter, setTotalCounter] = useState<number | null>(null);
  const [uploading, setUploading] = useState(true);
  const [creatingPost, setCreatingPost] = useState("viewing");

  // get list from firebase to render
  const getList = async () => {
    const collectionRef = collection(db, currentList);
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = await onSnapshot(q, (snapshot) => {
      setLists(
        currentList,
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setLoading(true);
    });

    return unsubscribe;
  };

  //user authentication
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser: User | null) => {
      if (authUser?.email === "tranfoodphoto.vn@gmail.com") {
        setLoading(false);
        setUser(authUser);
        getList();
      } else {
        setUser(null);
        router.push("/login");
      }
    });
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
        setUploading(false);
      }
      setUploadCounter(index + 1);
      // Create a new Image object with the same source as the original image
      const image = new Image();
      const storage = getStorage();
      const storageRef = ref(storage, files[index].name);
      const alreadyUploaded = await checkName(files[index].name.slice(0, -4));
      if (!alreadyUploaded) {
        const metaData = {
          cacheControl: "public,max-age=31536000",
          contentType: "image/jpg",
        };
        // 'file' comes from the Blob or File API
        await uploadBytes(storageRef, files[index], metaData).then(
          (baseImage) => {
            getDownloadURL(baseImage.ref).then((url) => {
              //load image to create a blur image
              image.onload = () => {
                const canvas = document.createElement("canvas");
                let width = image.width / 2;
                let height = image.height / 2;
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx?.drawImage(image, 0, 0, width, height);
                //create blur image url
                const blurDataURL = canvas.toDataURL(
                  "image/jpeg",
                  0.000000000000000000000000000000000000000000000000000000000000001
                );
                //add Doc to firestore
                const collectionRef = collection(db, currentList);
                addDoc(collectionRef, {
                  timestamp: serverTimestamp(),
                  url: url,
                  title: files[index].name.slice(0, -4),
                  blurDataURL: blurDataURL,
                  width: image.width,
                  height: image.height,
                });
                //Remove Loading at final doc
                if (index === files.length - 1) {
                  event.target.value = "";
                  setUploading(true);
                  setUploadCounter(null);
                }
              };
              image.src = URL.createObjectURL(files[index]);
            });
          }
        );
      } else if (index === files.length - 1) {
        event.target.value = "";
        setUploading(true);
      }
    }
  };

  const checkImage = async (name: string) => {
    const storage = getStorage();
    const imageRef = ref(storage, name);
    try {
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    } catch (error) {
      // Handle any errors that occur during URL retrieval
      console.error("Error getting image URL:", error);
      return false;
    }
  };

  const uploadPost = async (PostValues: Post, counter: number, id: string) => {
    setUploading(false);
    let uploadObject: Post = {
      title: "",
      imageTitle: "",
      image1: "",
      description1: "",
    };
    const values = Object.entries(PostValues);
    console.log(values, counter, id);
    if (PostValues.title !== "") {
      const handleValues = async (index: number) => {
        const key = values[index][0];
        const value = values[index][1];
        console.log(values, "4");
        if (key.includes("image")) {
          if (value.file !== "") {
            const image = new Image();
            const storage = getStorage();
            const storageRef = ref(storage, value.file.name.slice(0, -4));
            const alreadyUploaded = await checkImage(
              value.file.name.slice(0, -4)
            );
            console.log(URL.createObjectURL(value.file));
            if (alreadyUploaded === false) {
              const metaData = {
                cacheControl: "public,max-age=31536000",
                contentType: "image/jpg",
              };
              await uploadBytes(storageRef, value.file, metaData).then(
                (baseImage) => {
                  getDownloadURL(baseImage.ref).then((url) => {
                    // load image to create a blur image
                    image.onload = () => {
                      const canvas = document.createElement("canvas");
                      let width = image.width / 2;
                      let height = image.height / 2;
                      canvas.width = width;
                      canvas.height = height;
                      const ctx = canvas.getContext("2d");
                      ctx?.drawImage(image, 0, 0, width, height);
                      //create blur image url
                      const blurDataURL = canvas.toDataURL(
                        "image/jpeg",
                        0.000000000000000000000000000000000000000000000000000000000000001
                      );
                      uploadObject[key] = {
                        url: url,
                        blurDataURL: blurDataURL,
                      };
                      handleValues(index + 1);
                    };
                    image.src = URL.createObjectURL(value.file);
                  });
                }
              );
            } else {
              const image = new Image();
              image.onload = () => {
                const canvas = document.createElement("canvas");
                let width = image.width / 2;
                let height = image.height / 2;
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx?.drawImage(image, 0, 0, width, height);
                //create blur image url
                const blurDataURL = canvas.toDataURL(
                  "image/jpeg",
                  0.000000000000000000000000000000000000000000000000000000000000001
                );
                uploadObject[key] = {
                  url: alreadyUploaded,
                  blurDataURL: blurDataURL,
                };
                handleValues(index + 1);
              };
              image.src = URL.createObjectURL(value.file);
            }
          } else {
            uploadObject[key] = {
              url: value.url,
              blurDataURL: value.blurDataUrl,
            };
            handleValues(index + 1);
          }
        } else if (index !== values.length - 1) {
          console.log(index, values.length - 1, "value");
          uploadObject[key] = PostValues[key];
          handleValues(index + 1);
        }
        // upload post
        else if (index === values.length - 1) {
          console.log(index);
          uploadObject[key] = PostValues[key];
          if (id === "") {
            const collectionRef = collection(db, currentList);
            console.log(uploadObject, index);
            await addDoc(collectionRef, {
              timestamp: serverTimestamp(),
              counter: counter,
              post: uploadObject,
            });
          } else {
            const docRef = doc(db, currentList, id);
            await updateDoc(docRef, { post: uploadObject, counter: counter });
          }
          setUploading(true);
          setCreatingPost("viewing");
        }
      };
      handleValues(0);
    } else {
      alert("title cannot be empty");
      setUploading(true);
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
                  creatingPost={creatingPost}
                  setCreatingPost={setCreatingPost}
                />
              ))}
            </div>
            {/* Upload Button */}
            {currentList !== "Blogs" && currentList !== "Recipes" ? (
              <ImageButton
                listObject={listObject[currentList]}
                activeList={activeList}
                setActiveList={setActiveList}
                currentList={currentList}
                upload={uploadImage}
              />
            ) : (
              <PostButtons
                creatingPost={creatingPost}
                setCreatingPost={setCreatingPost}
              />
            )}
          </article>
          {/* Display Image and Loading interface */}
          {!loading || !uploading ? (
            <Loading
              uploadCounter={uploadCounter}
              totalCounter={totalCounter}
            />
          ) : currentList !== "Blogs" && currentList !== "Recipes" ? (
            <ImageList
              listObject={listObject[currentList]}
              currentList={currentList}
              activeList={activeList}
              setActiveList={setActiveList}
            />
          ) : (
            <PostList
              listObject={listObject[currentList]}
              currentList={currentList}
              upload={uploadPost}
              creatingPost={creatingPost}
              setCreatingPost={setCreatingPost}
            />
          )}
        </section>
      </Animation>
    )
  );
};

export default UploadImage;
