"use client";

import Image from "next/image";
import React, { useState } from "react";
import lady from "@/public/images/pretty-lady.jpg";
import { MediaIcon } from "@/type/type";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import Icon from "./Icon";
import emailjs from "@emailjs/browser";
import { MdOutlineDone } from "react-icons/md";

interface translateObj {
  intro: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submit: string;
}
interface ContactPage {
  translateObj: translateObj;
}
interface Input {
  name: string;
  placeholder: string;
  type: string;
}

const ContactPage: React.FC<ContactPage> = ({ translateObj }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputs: Input[] = [
    { name: "user_name", placeholder: translateObj.name, type: "text" },
    { name: "user_email", placeholder: translateObj.email, type: "email" },
    { name: "subject", placeholder: translateObj.subject, type: "text" },
    { name: "message", placeholder: translateObj.message, type: "textarea" },
  ];
  const media: MediaIcon[] = [
    {
      icon: FiInstagram,
      slug: "FiInstagram",
    },
    {
      icon: FiFacebook,
      slug: "https://www.facebook.com/profile.php?id=100028181002993",
    },
  ];
  const sendEmail = (e: any) => {
    setLoading(true);
    e.preventDefault();

    emailjs
      .sendForm(
        "service_hvsmzcf",
        "template_g7znk8v",
        "#form",
        "JeAJOdf0fZO_JJtXT"
      )
      .then(
        (result) => {
          setSuccess(true);
          setTimeout(() => {
            setLoading(false);
            setSuccess(false);
          }, 2000);
        },
        (error) => {
          alert(error);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      );
    e.target?.reset();
  };
  return (
    <section className="flex xl:items-center xl:justify-center w-full">
      <article className="w-full xl:w-1024 flex flex-col lg:flex-row shadow-2xl rounded-md overflow-hidden md:self-center">
        <div className="basis-1 lg:basis-1/3 bg-gradient-to-b from-purple to-blue p-16 md:p-24 lg:p-32 xl:p-40 flex flex-col relative gap-16 md:gap-24 lg:gap-32 xl:gap-40 justify-center ">
          <Image
            src={lady.src}
            alt="pretty lady"
            placeholder="blur"
            blurDataURL={lady.blurDataURL}
            sizes="100vw"
            width={128}
            height={128}
            className="rounded-full flex-shrink-0 flex-grow-0 w-128 h-128 object-cover object-top "
          />
          <p className="bg-white p-16 font-regular text-black text-xl rounded-md w-full md:w-[80%] lg:w-full">
            {translateObj.intro}
          </p>
          <div className="flex gap-16 text-2xl font-bold">
            {media.map((icon: MediaIcon) => {
              return <Icon key={icon.slug} slug={icon.slug} icon={icon.icon} />;
            })}
          </div>
        </div>
        <div className="relative basis-1 lg:basis-2/3 ">
          {/* success */}
          <div
            className={`absolute w-full ${
              loading ? "opacity-100 z-9" : "opacity-0 -z-1"
            } h-full transition-all duration-400 bg-blue xl:bg-gradient-to-b xl:from-purple xl:to-blue flex justify-center items-center`}
          >
            {!success && loading && <span className="loader"></span>}
            <div
              className={`${
                success ? "opacity-1" : "opacity-0 "
              } absolute transition-opacity duration-200 flex flex-col items-center p-32`}
            >
              <MdOutlineDone className="text-8xl text-white"/>
              <p className="text-2xl text-white font-bold text-center">
                Thank You for Contacting!
              </p>
            </div>
          </div>
          <form
            id="form"
            onSubmit={sendEmail}
            className=" bg-white px-16 md:px-24 lg:px-32 xl:px-40 py-40 flex gap-40 text-black flex-wrap justify-between items-start"
          >
            {/* form input */}
            {inputs.map((input: Input) => (
              <div
                key={input.name}
                className={`relative ${
                  input.name.includes("user")
                    ? "w-full md:w-[calc(50%-40px)]"
                    : "w-full"
                }`}
              >
                {input.type === "text" || input.type === "email" ? (
                  <input
                    required
                    id={input.name}
                    name={input.name}
                    placeholder=""
                    type={input.type}
                    className={`peer bg-transparent py-8 
                     border-b focus:border-b-2
                  border-black/50  focus:border-purple transition w-full  valid:border-b-2 `}
                  />
                ) : (
                  <textarea
                    required
                    id={input.name}
                    name={input.name}
                    placeholder=""
                    rows={7}
                    cols={50}
                    className={`peer bg-transparent px-8 py-8 
                     border-2 focus:border-b-2
                  border-black/50  focus:border-purple transition w-full valid:border-2 rounded`}
                  />
                )}
                <label
                  htmlFor={input.name}
                  className={`absolute ${
                    input.type === "textarea"
                      ? "top-8 peer-focus:-top-8 peer-valid:-top-8 peer-focus:bg-white peer-valid:bg-white z-2"
                      : "top-1/2 transform -translate-y-1/2 peer-focus:top-0 peer-valid:top-0 "
                  }  text-black/50 text-lg left-8 peer-focus:text-sm  peer-focus:font-bold transition-all peer-focus:text-purple peer-focus:px-4 peer-valid:px-4  origin-[0_0] truncate  peer-valid:text-sm peer-valid:font-bold`}
                >
                  {input.placeholder}
                </label>
              </div>
            ))}
            <div className="w-full flex justify-end">
              <button
                type="submit"
                className="bg-purple px-16 py-8 rounded text-white font-bold hover:bg-blue transition hover:text-black"
              >
                {translateObj.submit}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default ContactPage;
