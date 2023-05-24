"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { RiLeafFill } from "react-icons/ri";

interface NavLink {
  slug: string;
  sub: boolean;
  name: string;
}
const NavLink: React.FC<NavLink> = ({ slug, sub, name }) => {
  const pathname = usePathname();

  return (
    <li
      className={`font-antic-didone text-xl tracking-wider py-8 flex items-center gap-4 ${
        sub && "ml-24"
      } ${
        pathname === slug ||
        pathname === "vie" + slug ||
        pathname === slug + "vie"
          ? "text-black pointer-events-none font-800"
          : "text-grey  font-600"
      } hover:text-black`}
    >
      <Link
        href={slug}
        {...(slug === "http://tranphotographicart.com/" && {
          target: "_blank",
          rel: "noopener",
        })}
      >
        {name}
      </Link>{" "}
      {(pathname === slug ||
        pathname === "vie" + slug ||
        pathname === slug + "vie") && (
        <RiLeafFill className="text-xl text-black" />
      )}
    </li>
  );
};

export default NavLink;
