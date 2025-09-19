import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react"; // Motion for React (Framer Motion)
import { footerData } from "../data/data";
import { NavLink } from "react-router";

const Footer = () => {
  const fullText = `${footerData?.copyright} ${footerData?.year}`;
  const letters = fullText.split("");

  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    let timeout;
    if (isInView && currentIndex < letters.length) {
      timeout = setTimeout(() => {
        setTypedText((prev) => prev + letters[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 70);
    }
    return () => clearTimeout(timeout);
  }, [isInView, currentIndex, letters]);

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.5 }}
      className="p-3 sm:px-5 md:px-10 lg:px-20 xl:px-44 bg-headerColorHover text-white w-full mt-10 xl:mt-20"
    >
      <h1 className="text-xl font-bold my-5 sm:py-2 sm:text-2xl w-full">
        {footerData?.logo?.slogan}
      </h1>

      <div className="sm:flex justify-between items-start sm:w-full">
        {/* Logo section */}
        <div className="sm:w-[33%]">
          <div className="w-full">
            <div className="flex items-center gap-2">
              <img
                src={footerData?.logo?.logoImage}
                alt={footerData?.logo?.brand}
                className="w-1/4 sm:w-1/3 xl:w-1/4"
                loading="lazy"
              />
              <div className="text-2xl font-semibold m-1 sm:text-4xl xl:text-6xl text-white">
                <h2>{footerData?.logo?.brand}</h2>
                <h2 className="sm:text-2xl xl:text-5xl">
                  {footerData?.logo?.des}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Links section */}
        <div className="sm:flex sm:gap-4 sm:w-[65%] lg:justify-between">
          <div>
            <h1 className="text-xl font-bold mt-5 mb-2 xl:text-2xl">Help</h1>
            {footerData?.helpLinks?.map((item, index) => (
              <NavLink
                to={item.url}
                key={index}
                className="flex flex-col text-sm gap-4 xl:text-lg"
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div>
            <h1 className="text-xl font-bold mt-5 mb-2 xl:text-2xl">Explore</h1>
            {footerData?.exploreLinks?.map((item, index) => (
              <NavLink
                to={item.url}
                key={index}
                className="flex flex-col text-sm gap-4 xl:text-lg"
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="sm:w-1/2 lg:w-[60%]">
            <h1 className="text-xl font-bold mt-5 mb-2 xl:text-2xl">
              Get In Touch
            </h1>
            <address className="my-2 leading-6">
              Address: {footerData?.contact?.address}
            </address>
            <p className="my-2 text-sm lg:text-lg">
              Helpline: {footerData?.contact?.helpline}
            </p>
            <p className="my-2 text-sm lg:text-lg">
              Email: {footerData?.contact?.email}
            </p>
            <div className="flex items-center justify-center gap-2 w-full xl:justify-start">
              {footerData?.socialMedia?.map((item, index) => (
                <NavLink
                  to={item.url}
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 text-white hover:scale-105 hover:drop-shadow-[0_0_8px_white] flex items-center justify-center text-2xl transition-all duration-300 xl:text-3xl xl:my-2"
                >
                  <item.icon />
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Typing Animation with Cursor Moving Along */}
      <div ref={ref}>
        <div className="text-center text-sm mt-2 w-full sm:text-md xl:mt-5 xl:text-lg font-bold relative flex justify-center">
          <span className="inline-flex text-white font-bold text-lg">
            {typedText}
            <motion.span
              className="ml-1"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              |
            </motion.span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
