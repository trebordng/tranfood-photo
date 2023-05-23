"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

interface NavLink {
  slug: string;
  sub: boolean;
  name: string;
}
const NavLink: React.FC<NavLink> = ({ slug, sub, name }) => {
  const pathname = usePathname();

  return (
    <li
      className={`font-antic-didone text-xl tracking-wider py-8 ${
        sub && "ml-24"
      } ${
        pathname === slug ||
        pathname === "vie" + slug ||
        pathname === slug + "vie"
          ? "text-black pointer-events-none font-bold"
          : "text-grey font-600"
      } hover:text-black hover:underline`}
    >
      <Link
        href={slug}
        {...(slug === "http://tranphotographicart.com/" && { target: "_blank", rel: "noopener" })}
      >
        {name}
      </Link>{" "}
    </li>
  );
};

export default NavLink;
