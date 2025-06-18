import React from 'react'
import { NavLink } from 'react-router';
import { navData } from '../../data/data';
import NavbarBtn from './NavbarBtn';
import { useStateContext } from '../../context/ContextProvider';
import { MdCancel } from "react-icons/md";

const NavbarLinks = () => {
  const { isActiveMenu, setIsActiveMenu } = useStateContext();
  const toggleMenu = () => {
    setIsActiveMenu(!isActiveMenu);
  };
  return (
    <div className='flex items-center justify-end font-semibold text-black max-sm:block max-sm:gap-3 max-sm:absolute max-sm:top-0 max-sm:right-0 max-sm:w-[45%] max-sm:text-[4vw] max-sm:bg-slate-50/80 max-sm:shadow-xl sm:text-[2vw] sm:gap-3 sm:w-[70%] md:text-[1.7vw] md:gap-5 lg:text-[1.3vw] lg:gap-10 xl:text-[1.1vw]'>
    <MdCancel className={`hidden max-sm:block cursor-pointer ${!isActiveMenu ? "max-sm:hidden " : "max-sm:block"} absolute top-0 right-0 text-xl text-headerColor w-6 h-6`} onClick={toggleMenu}/>
      {
        navData.navbar.links.map((link, idx) => (
          <div key={idx} className={`hover:text-headerColor ${!isActiveMenu ? "max-sm:hidden " : "max-sm:block"} max-sm:m-5`}><NavLink to={link.path}>{link.name}</NavLink></div>
        ))
      }
      <NavLink to="/login" className={`${!isActiveMenu ? "max-sm:hidden " : "max-sm:block"}`}><NavbarBtn /></NavLink>
      
    </div>
  )
}

export default NavbarLinks
