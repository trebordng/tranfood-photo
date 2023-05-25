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
    <section className="hidden xl:inline-block border-t border-black pt-16">
      {languages.map((language) => (
        <Link href={currentURL} locale={language.locale} key={language.name}>
          <button className="mb-16 font-antic-didone block text-xl text-grey hover:underline">
            {language.name}
          </button>
        </Link>
      ))}
      <div className="xl:flex xl:gap-16 xl:text-2xl">
        {media.map((icon: MediaIcon) => {
          return <Icon key={icon.slug} slug={icon.slug} icon={icon.icon} />;
        })}
      </div>
    </section>
  );
};

export default NavUtils;
