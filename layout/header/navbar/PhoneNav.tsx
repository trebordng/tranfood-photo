"use client";

import React, { useEffect } from "react";
import { RiMenu3Line } from "react-icons/ri";

const PhoneNav = () => {
  // scroll event for smaller size screens
  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (window.innerWidth < 1280) {
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

  return (
    <React.Fragment>
      <button
        id="phone-nav"
        aria-label="phone-nav"
        className="xl:hidden text-black transition-all duration-2000 ease-linear"
      >
        <RiMenu3Line className="text-2xl" />
      </button>
    </React.Fragment>
  );
};

export default PhoneNav;
