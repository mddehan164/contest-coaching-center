import React from 'react'
import { NavLink } from 'react-router';
import { navData } from '../../data/data';
import NavbarBtn from './NavbarBtn';
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useStateContext } from '../../context/ContextProvider';
import { MdCancel } from "react-icons/md";





const NavbarLinks = () => {
  const { isActiveMenu, setIsActiveMenu } = useStateContext();
  const toggleMenu = () => {
    setIsActiveMenu(!isActiveMenu);
  };
  return (
    <ul className='flex items-center gap-10 text-lg font-semibold text-black max-sm:block max-sm:gap-3 max-sm:relative max-sm:w-[70%]'>
      <li><MdCancel className={`hidden max-sm:block max-md:block cursor-pointer ${!isActiveMenu ? "max-sm:hidden max-md:hidden" : "max-sm:block max-md:block"} text-center`} onClick={toggleMenu}/></li>
      {
        navData.navbar.links.map((link, idx) => (
          <li key={idx} className={`hover:text-headerColor ${!isActiveMenu ? "max-sm:hidden max-md:hidden" : "max-sm:block max-md:block"} max-sm:bg-[rgba(174,248,174,0.34)] `}><NavLink to={link.path}>{link.name}</NavLink></li>
        ))
      }
      <li className={`bg-headerColor px-6 py-4 text-white rounded-lg hover:bg-headerColorHover ${!isActiveMenu ? "max-sm:hidden max-md:hidden" : "max-sm:block max-md:block"}`}><NavLink to="/login"><NavbarBtn /></NavLink></li>
      <li><AiOutlineMenuUnfold className={`hidden max-sm:block max-md:block cursor-pointer ${isActiveMenu ? "max-sm:hidden max-md:hidden" : "max-sm:block max-md:block"}`} onClick={toggleMenu}/></li>
    </ul>
  )
}

export default NavbarLinks
