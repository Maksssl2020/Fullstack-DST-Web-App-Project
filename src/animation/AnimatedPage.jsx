import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const pageTransition = {
  type: "tween",
  duration: 1,
};

const AnimatedPage = ({ children }) => {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      variants={animations}
      transition={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
