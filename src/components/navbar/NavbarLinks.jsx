import React from 'react'
import { NavLink } from 'react-router';
import { navData } from '../../data/data';

const NavbarLinks = () => {
  return (
    <ul className='flex gap-4 text-lg font-semibold text-headerColor'>
      {
        navData.navbar.links.map((link, idx) => (
          <li key={idx}><NavLink to={link.path}>{link.name}</NavLink></li>
        ))
      }
    </ul>
  )
}

export default NavbarLinks
