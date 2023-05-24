import React from "react";
import Logo from "./Logo";
import Navbar from "./navbar";
import NavUtils from "./utils";

const Header = () => {
  return (
    <nav className="flex xl:flex-col xl:basis-1/5 xl:items-start xl:pr-40 justify-between items-center pb-16 md:pb-24 lg:pb-32 xl:pb-0  xl:min-h-full">
      <Logo />
      <Navbar />
      <NavUtils />
    </nav>
  );
};

export default Header;
