import React from 'react'
import NavbarLogo from './NavbarLogo'
import NavbarLinks from './NavbarLinks'
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useStateContext } from '../../context/ContextProvider';



const Navbarmain = () => {
  const { isActiveMenu, setIsActiveMenu } = useStateContext();
    const toggleMenu = () => {
      setIsActiveMenu(!isActiveMenu);
    };
  return (
   <nav className='text-black w-full flex justify-between items-center relative max-sm:px-2 sm:px-5 lg:px-36 z-20'>
      <NavbarLogo />
      <NavbarLinks />
      <div><AiOutlineMenuUnfold className={`hidden max-sm:block cursor-pointer ${isActiveMenu ? "max-sm:hidden " : "max-sm:block"} text-headerColor font-extrabold w-5 h-5`} onClick={toggleMenu}/></div>
   </nav>
  )
}

export default Navbarmain
