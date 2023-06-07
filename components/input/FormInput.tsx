"use client";

import { Dispatch } from "react";

interface FormInput {
  name: string;
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
    <div className="mb-16 w-full">
      <label className="text-xl block text-black font-bold">{name}</label>
      <input
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={(e) => onChange(setValue, e.target.value)}
        className="text-md appearance-none w-full my-4 p-8 md:w-256 text-gray shadow-lg rounded-md border border-gray/10 focus:text-black focus:shadow-out focus:border-black/50"
      />
    </div>
  );
};

export default FormInput;
