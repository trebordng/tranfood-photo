"use client";
import React, { SetStateAction } from "react";

interface ListTab {
  list: string;
  currentList: string;
  setCurrentList: React.Dispatch<SetStateAction<string>>;
}
const ListTab: React.FC<ListTab> = ({ list, currentList, setCurrentList }) => {
  return (
    <button
      key={list}
      id={list + `-upload-tab`}
      onClick={() => {
        setCurrentList(list);
      }}
      className={`transition flex-auto shadow-xl px-24 py-8 rounded-md font-semibold text-center border-gray-100 border  ${
        currentList === list
          ? "bg-purple-1 text-white pointer-events-none"
          : "cursor-pointer hover:bg-gray-100"
      } `}
    >
      {list}
    </button>
  );
};

export default ListTab;
