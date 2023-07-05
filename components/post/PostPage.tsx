import Animation from "@/layout/animation";
import { db } from "@/utils/firebase";
import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import React from "react";
import Posts from "./Posts";
import { PostData } from "@/type/type";

interface PostPage {
  list: string;
}
const getList = async (list: string) => {
  const collectionRef = collection(db, list);
  const q = query(collectionRef, orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  var result: PostData[] = [];
  for (let index = 0; index < querySnapshot.docs.length; index++) {
    // doc.data() is never undefined for query doc snapshots
    const data = querySnapshot.docs[index].data() as DocumentData;
    const post: PostData = {
      timestamp: data.timestamp.toDate().toLocaleDateString(),
      id: querySnapshot.docs[index].id,
      post: data.post,
    };
    result.push(post);
  }
  console.log(result);
  return result;
};

/* @ts-expect-error Async Server Component */
const PostPage: React.FC<PostPage> = async ({ list }) => {
  const data = await getList(list);
  return (
    <Animation>
      <section className="flex flex-col md:flex-wrap md:flex-row gap-16 md:gap-24 flex-auto">
        <Posts data={data} list={list} />
      </section>
    </Animation>
  );
};

export default PostPage;
