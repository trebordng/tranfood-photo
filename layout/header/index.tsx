import React from "react";
import Logo from "./Logo";
import Navbar from "./navbar";
import NavUtils from "./utils";

const Header = () => {
  return (
    <nav className="flex xl:flex-col xl:items-start justify-between items-center">
      <Logo />
      <Navbar />
      <NavUtils />
    </nav>
  );
};

export default Header;
