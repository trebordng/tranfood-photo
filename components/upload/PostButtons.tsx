import React, { SetStateAction } from "react";
interface PostButtons {
  creatingPost: string;
  setCreatingPost: React.Dispatch<SetStateAction<string>>;
}
const PostButtons: React.FC<PostButtons> = ({
  creatingPost,
  setCreatingPost,
}) => {
  return (
    <div className="mt-16 md:mt-24 lg:mt-32 xl:mt-40 flex flex-wrap gap-16">
      <button
        onClick={() => setCreatingPost("creating")}
        className={`${
          creatingPost !== "viewing" && "pointer-events-none opacity-50"
        } hover:bg-gray/10 cursor-pointer py-8 px-24 shadow-xl rounded-md border-gray/10 border inline-block`}
      >
        Create New Post
      </button>
    </div>
  );
};

export default PostButtons;
