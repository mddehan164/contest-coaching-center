// ScrollAnimatedSection.jsx
import { motion } from "motion/react";
import { useStateContext } from "../context/ContextProvider";

const ScrollAnimatedSection = ({ children, id, direction = "right" }) => {
  const { scrollAnimatedSections, setScrollAnimatedSections } = useStateContext();
  const alreadyAnimated = scrollAnimatedSections[id] || false;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const xOffset = direction === "left" ? -200 : 200;

  return (
    <motion.section
      initial={isMobile ? undefined : "hidden"}
      whileInView={isMobile ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
      variants={
        isMobile
          ? {}
          : {
              hidden: { opacity: 0, x: xOffset },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }
      }
      onViewportEnter={() => {
        if (!alreadyAnimated) {
          setScrollAnimatedSections(prev => ({ ...prev, [id]: true }));
        }
      }}
    >
      {children}
    </motion.section>
  );
};

export default ScrollAnimatedSection;
