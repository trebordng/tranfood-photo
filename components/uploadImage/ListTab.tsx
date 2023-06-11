"use client";
import React, { SetStateAction } from "react";

interface ListTab {
  list: string;
  currentList: string;
  setCurrentList: React.Dispatch<SetStateAction<string>>;
  setCreatingPost: React.Dispatch<SetStateAction<string>>;
  creatingPost: string;
}
const ListTab: React.FC<ListTab> = ({
  list,
  currentList,
  setCurrentList,
  setCreatingPost,
  creatingPost,
}) => {
  return (
    <button
      key={list}
      id={list + `-upload-tab`}
      onClick={() => {
        if (creatingPost === "creating" || creatingPost === "editing") {
          if (confirm("Are you sure to discard current Post?")) {
            setCreatingPost("viewing");
            setCurrentList(list);
          }
        } else {
          setCurrentList(list);
        }
      }}
      className={`transition flex-auto shadow-xl px-24 py-8 rounded-md font-semibold text-center border-gray/10 border  ${
        currentList === list
          ? "bg-purple text-white pointer-events-none"
          : "cursor-pointer hover:bg-gray/10"
      } `}
    >
      {list}
    </button>
  );
};

export default ListTab;
