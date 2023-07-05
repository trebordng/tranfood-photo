import { Post } from "@/type/type";
import { db } from "@/utils/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";
import React, { SetStateAction } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

interface PostLayout {
  post: Post;
  setCreatingPost: React.Dispatch<SetStateAction<string>>;
  index: number;
  id: string;
  currentList: string;
}
const PostLayout: React.FC<PostLayout> = ({
  post,
  setCreatingPost,
  index,
  id,
  currentList,
}) => {
  const editPost = () => {
    setCreatingPost(`editing${index}`);
  };
  const deletePost = async (e: any) => {
    e.stopPropagation();
    await deleteDoc(doc(db, currentList, id));
  };
  return (
    <article
      onClick={editPost}
      className="md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] h-416 xl:h-512 rounded-lg overflow-hidden relative cursor-pointer"
    >
      {post.imageTitle.blurDataURL !== "" && (
        <Image
          src={post.imageTitle.url}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw,
    (max-width: 1280px) 50%,
    (max-width: 1536px) 33%,
    25vw"
          style={{ objectFit: "cover", transform: "translate3d(0, 0, 0)" }}
          className="hover:blur-sm transition peer"
          placeholder="blur"
          loading="lazy"
          blurDataURL={post.imageTitle.blurDataURL}
        />
      )}
      <AiFillCloseCircle
        className="text-xl text-white absolute top-8 left-8 cursor-pointer hover:scale-110"
        onClick={(e) => deletePost(e)}
      />
      <h2 className="transition text-center text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold pointer-events-none invisible peer-hover:visible peer                                                            ">
        {post.title}
      </h2>
    </article>
  );
};

export default PostLayout;
