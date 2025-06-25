// components/common/ScrollAnimatedSection.jsx

import { motion, useInView, useAnimation } from "motion/react";
import { useEffect, useRef } from "react";
import { useStateContext } from "../context/ContextProvider";

const ScrollAnimatedSection = ({
  children,
  id,
  className = "",
  direction = "right",
  animation = {},
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.4,
  });

  const controls = useAnimation();
  const { scrollAnimatedSections, setScrollAnimatedSections } = useStateContext();

  const alreadyAnimated = scrollAnimatedSections[id];

  useEffect(() => {
    if (inView && !alreadyAnimated) {
      controls.start("visible");
      setScrollAnimatedSections((prev) => ({ ...prev, [id]: true }));
    }
  }, [inView, alreadyAnimated]);

  const xOffset = direction === "left" ? -100 : direction === "right" ? 100 : 0;

  const defaultVariants = {
    hidden: { opacity: 0, x: xOffset },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      variants={animation.variants || defaultVariants}
      initial="hidden"
      animate={alreadyAnimated ? "visible" : controls}
      className={`my-10 ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default ScrollAnimatedSection;
