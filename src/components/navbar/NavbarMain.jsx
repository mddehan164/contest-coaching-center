import React, { useState } from "react";
import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import { AiOutlineMenuUnfold } from "react-icons/ai";

const Navbarmain = () => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  const toggleMenu = () => setIsActiveMenu(!isActiveMenu);

  return (
    <nav className="text-black w-full flex justify-between items-center relative max-sm:px-2 sm:px-5 lg:px-20 xl:px-40 z-20 bg-white">
      <NavbarLogo />
      <NavbarLinks />
      <div>
        <AiOutlineMenuUnfold
          className={`hidden max-sm:block cursor-pointer text-headerColor font-extrabold w-5 h-5`}
          onClick={toggleMenu}
        />
      </div>
    </nav>
  );
};

export default Navbarmain;
