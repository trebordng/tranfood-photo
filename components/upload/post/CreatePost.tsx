"use client";

import { Post } from "@/type/type";
import Image from "next/image";
import React, { SetStateAction, useCallback, useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

interface Field {
  name: string;
  type: "text" | "image" | "textarea";
  value: string;
}
interface CreatePost {
  upload: (PostValues: Post, counter: number, id: string) => void;
  currentList: string;
  creatingPost: string;
  setCreatingPost: React.Dispatch<SetStateAction<string>>;
  listObject?: Post[];
}
const CreatePost: React.FC<CreatePost> = ({
  upload,
  currentList,
  creatingPost,
  setCreatingPost,
  listObject,
}) => {
  const [values, setValues] = useState<Post>({
    title: "",
    imageTitle: { file: "", url: "", blurDataURL: "" },
    image1: { file: "", url: "", blurDataUrl: "" },
    description1: "",
  });
  const [currentId, setCurrentId] = useState<string>("");
  const [counter, setCounter] = useState<number>(1);
  const [fields, setFields] = useState<Field[]>([
    { name: "Title", type: "text", value: "title" },
    { name: "Image Title", type: "image", value: "imageTitle" },
    { name: "Image 1", type: "image", value: "image1" },
    {
      name: "Description 1",
      type: "textarea",
      value: "description1",
    },
  ]);

  // handle text fields
  const handleText = (name: string, text: string) => {
    console.log(text);
    setValues((prevValues) => ({
      ...prevValues,
      [name]: text,
    }));
  };

  // handle image fields
  const handleImage = (
    purpose: string,
    id: string,
    name: string,
    file: File | string | null
  ) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: { file: file, url: "", blurDataUrl: "" },
    }));

    var button = document.getElementById(id) as HTMLInputElement;
    //remove cache
    if (purpose === "remove" && button !== null) {
      button.value = "";
    }
    console.log(values);
  };

  // cancel and return to post
  const cancel = () => {
    if (confirm("Are you sure you want to cancel")) {
      setCreatingPost("viewing");
    }
  };

  //add more fields
  const addMore = () => {
    setCounter(counter + 1);
    setFields((prevFields) => [
      ...prevFields,
      {
        name: `Image ${counter + 1}`,
        type: "image",
        value: `image${counter + 1}`,
      },
      {
        name: `Description ${counter + 1}`,
        type: "textarea",
        value: `description${counter + 1}`,
      },
    ]);
    setValues((prevValues) => ({
      ...prevValues,
      [`image${counter + 1}`]: { file: "", url: "", blurDataUrl: "" },
      [`description${counter + 1}`]: "",
    }));
  };

  useEffect(() => {
    if (listObject) {
      const currentPostIndex = parseInt(creatingPost.slice(7));
      setCounter(listObject[currentPostIndex].counter);
      setCurrentId(listObject[currentPostIndex].id);
      const currentPost = listObject[currentPostIndex].post;
      console.log(currentPost, "current post index");
      setValues((prevState) => ({
        ...prevState,
        title: currentPost.title,
        imageTitle: {
          file: "",
          url: currentPost.imageTitle.url,
          blurDataUrl: currentPost.imageTitle.blurDataURL,
        },
        description1: currentPost.description1,
        image1: {
          file: "",
          url: currentPost.image1.url,
          blurDataUrl: currentPost.image1.blurDataURL,
        },
      }));

      if (listObject[currentPostIndex].counter > 1) {
        for (
          let index = 2;
          index <= listObject[currentPostIndex].counter;
          index++
        ) {
          console.log(index, listObject[currentPostIndex].counter);
          setFields((prevFields) => [
            ...prevFields,
            {
              name: `Image ${index}`,
              type: "image",
              value: `image${index}`,
            },
            {
              name: `Description ${index}`,
              type: "textarea",
              value: `description${index}`,
            },
          ]);
          setValues((prevState) => ({
            ...prevState,
            [`image${index}`]: {
              file: "",
              url: currentPost[`image${index}`].url,
              blurDataUrl: currentPost[`image${index}`].blurDataURL,
            },
            [`description${index}`]: currentPost[`description${index}`],
          }));
        }
      }
    }
  }, []);
  return (
    <article className="flex flex-col justify-center items-center gap-16 md:gap-24 lg:gap-32 xl:gap-40 max-w-full">
      {fields.map((field) =>
        // TEXT FIELDS
        field.type === "text" ? (
          <div className="w-full text-center" key={field.name}>
            <label
              htmlFor={field.name}
              className="text-2xl block font-bold text-center"
              aria-label={field.name}
            >
              {field.name}
            </label>
            <input
              id={field.name}
              type="text"
              value={values[field.value]}
              placeholder={field.name}
              onChange={(e) => handleText(field.value, e.target.value)}
              className="mt-16 p-8 w-full md:w-416 rounded-md"
            />
          </div>
        ) : //DESCRIPTION
        field.type === "textarea" ? (
          <div className="w-full text-center" key={field.name}>
            <label
              htmlFor={field.name}
              aria-label={field.name}
              className="text-2xl block font-bold text-center"
            >
              {field.name}
            </label>
            <textarea
              id={field.name}
              value={values[field.value]}
              onChange={(e) => handleText(field.value, e.target.value)}
              placeholder={field.name}
              className="mt-16 p-8 w-full md:w-416 rounded-md min-h-256"
            />
          </div>
        ) : // IMAGES
        field.type === "image" ? (
          <div
            key={field.name}
            className="flex gap-16 items-start border-t-[8px] border-purple pt-16"
          >
            <input
              type="file"
              id={field.name}
              hidden
              accept={"image/*"}
              onChange={(e) =>
                handleImage(
                  "add",
                  field.name,
                  field.value,
                  e.target.files && e.target.files[0]
                )
              }
            />
            <label
              htmlFor={field.name}
              className="hover:bg-gray/10 cursor-pointer py-8 px-24 shadow-xl rounded-md border-gray/10 border inline-block"
            >
              Upload {field.name}
            </label>
            {(values[field.value].file !== "" ||
              values[field.value].url !== "") && (
              <div className="relative">
                <Image
                  onClick={() => {
                    console.log(values[field.value]);
                  }}
                  alt={field.name}
                  src={
                    values[field.value].file === ""
                      ? values[field.value].url
                      : URL.createObjectURL(values[field.value].file)
                  }
                  height={124}
                  width={124}
                  sizes="256px"
                  style={{
                    height: 124,
                    width: 124,
                    objectFit: "cover",
                  }}
                />
                <AiFillCloseCircle
                  className="text-xl text-white z-999 absolute top-4 left-4 cursor-pointer hover:scale-110"
                  onClick={() =>
                    handleImage("remove", field.name, field.value, "")
                  }
                />
              </div>
            )}
          </div>
        ) : (
          <></>
        )
      )}
      {/* UTIL BUTTONS */}
      <div className="flex gap-16 items-start">
        <button
          onClick={addMore}
          className="hover:bg-purple/50 cursor-pointer py-8 px-24 shadow-xl rounded-md border-purple/10 bg-purple text-white border inline-block"
        >
          Add More
        </button>
        <button
          onClick={() => upload(values, counter, currentId)}
          className="hover:bg-gray/10 cursor-pointer py-8 px-24 shadow-xl rounded-md border-gray/10 border inline-block"
        >
          Submit
        </button>{" "}
        <button
          onClick={cancel}
          className="hover:bg-red/50 cursor-pointer py-8 px-24 shadow-xl rounded-md bg-red border-red/10 border text-white"
        >
          Cancel
        </button>
      </div>
    </article>
  );
};

export default CreatePost;
