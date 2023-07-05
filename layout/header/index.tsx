import React from "react";
import Logo from "./Logo";
import Navbar from "./navbar";
import NavUtils from "./utils";

const Header = () => {
  return (
    <nav
      id="navbar"
      className="flex xl:flex-col sticky top-16 md:top-24 lg:top-32 xl:top-40 xl:items-start xl:max-h-[calc(100vh-80px)] justify-between items-center z-999 xl:z-9"
    >
      <Logo />
      <Navbar />
      <NavUtils />
    </nav>
  );
};

export default Header;
