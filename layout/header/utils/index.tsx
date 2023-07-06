"use client";

import React from "react";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import Icon from "./Icon";
import { usePathname } from "next/navigation";
import Link from "next-intl/link";
import { MediaIcon } from "@/type/type";

interface Language {
  name: string;
  locale: string;
}
const NavUtils = () => {
  const pathname = usePathname();

  let currentURL: string;
  if (pathname.includes("vi")) {
    if (pathname.includes("vi/")) {
      currentURL = pathname.replace("vi/", "");
    } else {
      currentURL = pathname.replace("vi", "");
    }
  } else {
    currentURL = pathname;
  }

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

  const languages: Language[] = [
    { name: "English", locale: "en" },
    { name: "Tiếng Việt", locale: "vi" },
  ];
  return (
    <div className="inline-block border-t border-black pt-16">
      {languages.map((language) => (
        <Link
          href={currentURL}
          locale={language.locale}
          key={language.name}
          className="text-center mb-16 font-antic-didone block text-2xl xl:text-left xl:text-xl xl:text-grey hover:underline"
        >
          {language.name}
        </Link>
      ))}
      <div className="flex gap-16 text-2xl justify-center xl:justify-start">
        {media.map((icon: MediaIcon) => {
          return <Icon key={icon.slug} slug={icon.slug} icon={icon.icon} />;
        })}
      </div>
    </div>
  );
};

export default NavUtils;
