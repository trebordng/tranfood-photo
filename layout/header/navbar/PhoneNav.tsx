"use client";

import { PageLink } from "@/type/type";
import React, { useEffect, useState } from "react";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import NavLinks from "./NavLinks";

interface PhoneNav {
  pages: PageLink[];
}

const PhoneNav: React.FC<PhoneNav> = ({ pages }) => {
  const [show, setShow] = useState(false);
  // scroll event for smaller size screens
  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (
        window.innerWidth < 1280 ||
        (window.innerWidth > 1280 && window.innerHeight < 800)
      ) {
        const scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        const classes = ["bg-purple", "p-4", "text-white"];
        if (scrollTop > 0) {
          for (let index = 0; index < classes.length; index++) {
            const element = classes[index];
            document.getElementById("phone-nav")?.classList.add(element);
          }
          document.getElementById("logo")?.classList.add("smallSize:opacity-0");
        } else {
          for (let index = 0; index < classes.length; index++) {
            const element = classes[index];
            document.getElementById("phone-nav")?.classList.remove(element);
          }
          document
            .getElementById("logo")
            ?.classList.remove("smallSize:opacity-0");
        }
      }
    });
  }, []);

  const handleToggle = () => {
    setShow(!show);
  };
  return (
    <React.Fragment>
      <button
        onClick={handleToggle}
        id="phone-nav"
        aria-label="phone-nav"
        className={`xl:hidden text-black transition-all duration-2000 ease-linear z-999 ${
          show && "transform rotate-90 bg-white"
        }`}
      >
        {show ? (
          <RiCloseLine className="text-black text-2xl" />
        ) : (
          <RiMenu3Line className="text-2xl" />
        )}
      </button>
      <ul
        className={`fixed ${
          show ? "opacity-1 z-99 right-0" : "opacity-0 -z-99 -right-[100vw]"
        } xl:hidden  w-full top-0 min-h-full bg-purple transition-right duration-300 flex flex-col justify-center items-center`}
      >
      {pages.map((page: PageLink) => (
        <NavLinks
          key={page.name}
          slug={page.slug}
          sub={page.sub}
          name={page.name}
        />
      ))}
    </ul>
    </React.Fragment>
  );
};

export default PhoneNav;
