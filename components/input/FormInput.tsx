"use client";

import { Dispatch } from "react";

interface FormInput {
    name:string;
  value: string;
  setValue: Dispatch<string>;
  placeholder: string;
  type: string;
}
const FormInput: React.FC<FormInput> = ({
  name,
  value,
  setValue,
  placeholder,
  type,
}) => {
  const onChange = (set: Dispatch<string>, value: string) => {
    set(value);
  };

  return (
    <div className="mb-16">
      <label className="text-xl block text-black font-bold">{name}</label>
      <input
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={(e) => onChange(setValue, e.target.value)}
        className="text-xl appearance-none w-full my-4 p-8 border text-grey shadow-lg rounded-md focus:text-black focus:bg-light-grey focus:outline-none focus:shadow-out"
      />
    </div>
  );
};

export default FormInput;
