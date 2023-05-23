"use client";

import React from "react";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import Icon from "./Icon";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";
import Link from "next-intl/link";

interface Media {
  icon: IconType;
  slug: string;
}

interface Language {
  name: string;
  locale: string;
}
const NavUtils = () => {
  const pathname = usePathname();

  let currentURL: string;
  if (pathname.includes("vie")) {
    if (pathname.includes("vie/")) {
      currentURL = pathname.replace("vie/", "");
    } else {
      currentURL = pathname.replace("vie", "");
    }
  } else {
    currentURL = pathname;
  }

  const media: Media[] = [
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
    { name: "Tiếng Việt", locale: "vie" },
  ];
  return (
    <section className="hidden xl:inline-block border-t border-black pt-16">
      {languages.map((language) => (
        <Link href={currentURL} locale={language.locale} key={language.name}>
          <button className="mb-16 font-antic-didone block text-xl text-grey hover:underline">{language.name}</button>
        </Link>
      ))}
      <div className="xl:flex xl:gap-16 xl:text-2xl">
        {media.map((item) => {
          return <Icon key={item.slug} slug={item.slug} icon={item.icon} />;
        })}
      </div>
    </section>
  );
};

export default NavUtils;
