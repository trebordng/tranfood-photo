import Image from "next/image";
import React from "react";
import lady from "@/public/images/pretty-lady.jpg";
import { useTranslations } from "next-intl";
import { MediaIcon } from "@/type/type";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import Icon from "./Icon";

const AboutPage = () => {
  const t = useTranslations("about");
  const full = [t("1"), t("2"), t("3"), t("4")];
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
  return (
    <section className="flex xl:items-center xl:justify-center w-full">
      <article className="w-full xl:w-1024 flex flex-col lg:flex-row shadow-2xl rounded-md overflow-hidden">
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
            {t("intro")}
          </p>
          <div className="flex gap-16 text-2xl font-bold">
        {media.map((icon: MediaIcon) => {
          return <Icon key={icon.slug} slug={icon.slug} icon={icon.icon} />;
        })}
      </div>
        </div>
        <div className="basis-1 lg:basis-2/3 bg-white p-16 md:p-24 lg:p-32 xl:p-40 flex flex-col gap-16 md:gap-24 lg:gap-32 xl:gap-40 text-black">
          {full.map((description:string)=>(
            <p className="text-xl">{description}</p>
          ))}
        </div>
        
      </article>
    </section>
  );
};

export default AboutPage;
