// HamburgerMenu.js

import React from "react";
import { FaBars } from "react-icons/fa";

const HamburgerMenu = ({ toggleMenu, isOpen }) => {
  return (
    <div
      className={`cursor-pointer ${isOpen ? "transform rotate-90" : ""}`}
      onClick={toggleMenu}
    >
      <FaBars className="text-violet-100" />
    </div>
  );
};

export default HamburgerMenu;
