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
   <nav className='text-black bg-blue-200 w-full flex justify-between items-center relative px-40 max-sm:px-2 max-md:px-2'>
      <NavbarLogo />
      <NavbarLinks />
      <div><AiOutlineMenuUnfold className={`hidden max-sm:block max-md:block cursor-pointer ${isActiveMenu ? "max-sm:hidden max-md:hidden" : "max-sm:block max-md:block"} text-headerColor font-extrabold w-5 h-5`} onClick={toggleMenu}/></div>
   </nav>
  )
}

export default Navbarmain
