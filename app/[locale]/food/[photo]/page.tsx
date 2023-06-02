"use client";

import { ListState } from "@/context/CanvasContext";
import { ImageObject } from "@/type/type";
import { db } from "@/utils/firebase";
import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect } from "react";

const Photo = () => {
  const { lists, setLists } = ListState();

  const getList = async (list: string) => {
    const collectionRef = collection(db, list);
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    var result: ImageObject[] = [];
    for (const doc of querySnapshot.docs) {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data() as DocumentData;

      const image: ImageObject = {
        url: data.url,
        title: data.title,
        blurDataURL: data.blurDataURL,
      };
      result.push(image);
    }
    return result;
  };

  useEffect(() => {
    if (lists["Food"]?.length === 0) {
      const getResult = async () => {
        const result = await getList("Food");
        setLists("Food", result);
        console.log(result);
      };
      getResult();
    }
  }, []);
  return (
    <div>
      {lists["Food"]?.map((a: ImageObject) => (
        <div key={a.title}>ádasdasd</div>
      ))}
    </div>
  );
};

export default Photo;
