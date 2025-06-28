import React, { useEffect, useState } from 'react';
import HeaderDetails from './HeaderDetails.jsx';
import HeaderIcons from './HeaderIcons.jsx';
import { motion, useAnimation } from "framer-motion";
import { NavbarMain } from '../index.jsx';

const containerVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

const leftChildVariants = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } };
const rightChildVariants = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } };

const Header = () => {
  const controls = useAnimation();
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      controls.start({ y: '-100%', transition: { duration: 0.4 } });
    } else {
      controls.start({ y: '0%', transition: { duration: 0.4 } });
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      animate={controls}
      initial={{ y: 0 }}
      className="fixed inset-x-0 top-0 w-full z-10 bg-headerColor text-headerTextColor"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-between w-full gap-10 max-sm:gap-1 max-sm:p-1 sm:px-5 md:px-10 lg:px-20 xl:px-44"
      >
        <motion.div variants={leftChildVariants}>
          <HeaderDetails />
        </motion.div>
        <motion.div variants={rightChildVariants}>
          <HeaderIcons />
        </motion.div>
      </motion.div>
      <NavbarMain />
    </motion.header>
  );
};

export default Header;
