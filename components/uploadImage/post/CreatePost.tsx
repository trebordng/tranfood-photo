import Image from "next/image";
import React, { SetStateAction, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

interface Values {
  title: string;
  image1?: any;
  description1?: string;
  image2?: any;
  description2?: string;
  image3?: any;
  description3?: string;
  image4?: any;
  description4?: string;
}
interface Field {
  name: string;
  type: "text" | "image" | "textarea";
  value: keyof Values;
}
interface CreatePost {
  creatingPost: string;
  setCreatingPost: React.Dispatch<SetStateAction<string>>;
}
const CreatePost: React.FC<CreatePost> = ({
  creatingPost,
  setCreatingPost,
}) => {
  const [values, setValues] = useState<Values>({
    title: "",
  });

  const fields: Field[] = [
    { name: "Title", type: "text", value: "title" },
    { name: "Image 1", type: "image", value: "image1" },
    {
      name: "Description 1",
      type: "textarea",
      value: "description1",
    },
    { name: "Image 2", type: "image", value: "image2" },
    {
      name: "Description 2",
      type: "textarea",
      value: "description2",
    },
    { name: "Image 3", type: "image", value: "image3" },
    {
      name: "Description 3",
      type: "textarea",
      value: "description3",
    },
    { name: "Image 4", type: "image", value: "image4" },
    {
      name: "Description 4",
      type: "textarea",
      value: "description4",
    },
  ];

  const handleText = (name: string, text: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: text,
    }));
    console.log(values);
  };

  const handleImage = (name: string, file: File | string | null) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: file,
    }));
  };

  const cancel = () => {
    if (confirm("Are you sure you want to cancel")) {
      setCreatingPost("viewing");
    }
  };

  return (
    <article className="flex flex-col justify-center items-center gap-16 md:gap-24 lg:gap-32 xl:gap-40 max-w-full">
      {fields.map((field) =>
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
        ) : field.type === "textarea" ? (
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
        ) : field.type === "image" ? (
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
                handleImage(field.value, e.target.files && e.target.files[0])
              }
            />
            <label
              htmlFor={field.name}
              className="hover:bg-gray/10 cursor-pointer py-8 px-24 shadow-xl rounded-md border-gray/10 border inline-block"
            >
              Upload {field.name}
            </label>
            {values[field.value] && (
              <div className="relative">
                <Image
                  alt={field.name}
                  src={URL.createObjectURL(values[field.value])}
                  width="120"
                  height="120"
                  className="object-cover"
                />
                <AiFillCloseCircle
                  className="text-xl text-white z-999 absolute top-4 left-4 cursor-pointer hover:scale-110"
                  onClick={() => handleImage(field.value, "")}
                />
              </div>
            )}
          </div>
        ) : (
          <></>
        )
      )}
      <div className="flex gap-16">
        <button className="hover:bg-gray/10 cursor-pointer py-8 px-24 shadow-xl rounded-md border-gray/10 border inline-block">
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
