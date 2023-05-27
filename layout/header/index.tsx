import React from "react";
import Logo from "./Logo";
import Navbar from "./navbar";
import NavUtils from "./utils";

const Header = () => {
  return (
    <nav className="flex xl:flex-col xl:sticky xl:top-40 xl:items-start xl:max-h-[calc(100vh-80px)] justify-between items-center">
      <Logo />
      <Navbar />
      <NavUtils />
    </nav>
  );
};

export default Header;
