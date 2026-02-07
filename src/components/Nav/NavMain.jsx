import React from "react";
import DesktopNav from "./Nav";
import MobileNav from "./MobileNav";

const Nav = ({ text = "gray-800" }) => {
  return (
    <>
      <MobileNav />
      <DesktopNav text={text} />
    </>
  );
};

export default Nav;