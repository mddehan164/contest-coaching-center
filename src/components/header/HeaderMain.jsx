import React from 'react'
import HeaderDetails from './HeaderDetails.jsx'
import HeaderIcons from './HeaderIcons.jsx'
import { motion } from "motion/react"
import { NavbarMain } from '../index.jsx'

// Parent animation
const containerVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

// Child animations
const leftChildVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const rightChildVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const Header = () => {
  return (
    <header className='w-full text-white px-0 py-0'>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className='flex items-center justify-between w-full gap-10 px-40 bg-headerColor text-headerTextColor max-sm:gap-1 max-sm:p-1 sm:px-5 md:px-10 lg:px-20 xl:px-44'
      >
        <motion.div variants={leftChildVariants}>
          <HeaderDetails />
        </motion.div>
        <motion.div variants={rightChildVariants}>
          <HeaderIcons />
        </motion.div>
      </motion.div>

      <div>
        <NavbarMain />
      </div>
    </header>
  );
};

export default Header;
