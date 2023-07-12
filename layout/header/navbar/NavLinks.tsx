"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { PageLink } from "@/type/type";

const NavLinks: React.FC<PageLink> = ({ slug, sub, name,onClick }) => {
  const pathname = usePathname();
  
  return (
    <li
      className={`whitespace-nowrap font-antic-didone text-2xl xl:text-xl tracking-wider py-8 flex items-center gap-16 xl:gap-4 ${
        sub && "xl:ml-24"
      } ${
        pathname === slug ||
        pathname === "/vi" + slug ||
        pathname === slug + "vi"
          ? "text-white font-bold underline xl:text-black xl:pointer-events-none xl:font-semibold"
          : "text-white/70 xl:text-gray xl:font-light xl:hover:text-black"
      } `}
    >
      <Link
        onClick={onClick}
        aria-label={slug}
        href={slug}
        {...(slug === "http://tranphotographicart.com/" && {
          target: "_blank",
          rel: "noopener",
        })}
      >
        {name}
      </Link>{" "}
     
    </li>
  );
};

export default NavLinks;
