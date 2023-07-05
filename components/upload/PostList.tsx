"use client";

import React, { SetStateAction } from "react";
import CreatePost from "./post/CreatePost";
import { Post } from "@/type/type";
import PostLayout from "./post/PostLayout";

interface PostList {
  creatingPost: string;
  setCreatingPost: React.Dispatch<SetStateAction<string>>;
  currentList: string;
  upload: (PostValues: any, counter: number,id:string) => void;
  listObject: Post[];
}
const PostList: React.FC<PostList> = ({
  listObject,
  creatingPost,
  setCreatingPost,
  currentList,
  upload,
}) => {
  // Create or Edit Post
  return creatingPost === "creating" ? (
    <CreatePost
      upload={upload}
      creatingPost={creatingPost}
      setCreatingPost={setCreatingPost}
      currentList={currentList}
    />
  ) : creatingPost.includes("editing") ? (
    <CreatePost
      upload={upload}
      creatingPost={creatingPost}
      setCreatingPost={setCreatingPost}
      currentList={currentList}
      listObject={listObject}
    />
  ) : (
    // Post List
    <div className="flex flex-col md:flex-wrap md:flex-row gap-16 md:gap-24 flex-auto max-w-full">
      {listObject?.map((post,index) => (
        <PostLayout key={index} index={index} post={post.post} setCreatingPost={setCreatingPost} id={post.id} currentList={currentList}/>
      ))}
    </div>
  );
};

export default PostList;
