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
    <div className='flex items-center gap-10 text-lg font-semibold text-black sm:block sm:gap-3 sm:absolute sm:top-0 sm:right-0 max-sm:w-[50%] sm:text-[4.8vw] sm:bg-slate-50/80 shadow-xl max-md:absolute max-md:top-0 max-md:block max-md:right-0 min-md:w-[50%] max-md:text-[3.2vw] max-md:bg-slate-50/80'>
      <MdCancel className={`hidden sm:block max-md:block cursor-pointer ${!isActiveMenu ? "sm:hidden max-md:hidden" : "sm:block max-md:block"} absolute top-0 right-0 text-xl text-headerColor w-6 h-6`} onClick={toggleMenu}/>
      {
        navData.navbar.links.map((link, idx) => (
          <div key={idx} className={`hover:text-headerColor ${!isActiveMenu ? "sm:hidden max-md:hidden" : "sm:block max-md:block"} sm:m-3 max-md:m-5`}><NavLink to={link.path}>{link.name}</NavLink></div>
        ))
      }
      <div className={`bg-headerColor px-6 py-4 text-white rounded-lg hover:bg-headerColorHover ${!isActiveMenu ? "sm:hidden max-md:hidden" : "sm:block max-md:block"} sm:py-1 sm:px-6 sm:rounded-md max-md:py-2 max-md:px-5`}><NavLink to="/login"><NavbarBtn /></NavLink></div>
      
    </div>
  )
}

export default NavbarLinks
