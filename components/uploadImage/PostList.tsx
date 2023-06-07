import React, { SetStateAction } from "react";

interface PostList {
  creatingPost: string;
  setCreatingPost: React.Dispatch<SetStateAction<string>>;
}
const PostList: React.FC<PostList> = ({ creatingPost, setCreatingPost }) => {
  return creatingPost === "creating" ? (
    <div>CreatePost</div>
  ) : creatingPost === "editing" ? (
    <div>Edit Post</div>
  ) : (
    <div>Lists</div>
  );
};

export default PostList;
