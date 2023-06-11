import React, { SetStateAction } from "react";
import CreatePost from "./post/CreatePost";

interface PostList {
  creatingPost: string;
  setCreatingPost: React.Dispatch<SetStateAction<string>>;
  currentList: string;
}
const PostList: React.FC<PostList> = ({
  creatingPost,
  setCreatingPost,
  currentList,
}) => {
  return creatingPost === "creating" ? (
    <CreatePost creatingPost={creatingPost} setCreatingPost={setCreatingPost} />
  ) : creatingPost === "editing" ? (
    <div>Edit Post</div>
  ) : (
    <div>Lists</div>
  );
};

export default PostList;
