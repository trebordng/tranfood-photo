"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { RiLeafFill } from "react-icons/ri";
import { PageLink } from "@/type/type";

const NavLink: React.FC<PageLink> = ({ slug, sub, name }) => {
  const pathname = usePathname();
  
  return (
    <li
      className={`font-antic-didone text-xl tracking-wider py-8 flex items-center gap-4 ${
        sub && "ml-24"
      } ${
        pathname === slug ||
        pathname === "/vi" + slug ||
        pathname === slug + "vi"
          ? "text-black pointer-events-none font-800"
          : "text-grey  font-600"
      } hover:text-black`}
    >
      <Link
        aria-label={slug}
        href={slug}
        {...(slug === "http://tranphotographicart.com/" && {
          target: "_blank",
          rel: "noopener",
        })}
      >
        {name}
      </Link>{" "}
      {(pathname === slug ||
        pathname === "/vi" + slug ||
        pathname === slug + "vi") && (
        <RiLeafFill className="text-xl text-black" />
      )}
    </li>
  );
};

export default NavLink;
