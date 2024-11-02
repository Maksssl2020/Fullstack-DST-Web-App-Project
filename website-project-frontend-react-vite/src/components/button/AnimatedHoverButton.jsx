import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AnimatedHoverButton = ({
  link,
  className,
  onClick,
  backgroundColorOnInit,
  textColorOnInit,
  backgroundColorOnHover,
  textColorOnHover,
  children,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick && link) {
      onClick();
      navigate(link);
    }
    if (onClick && !link) {
      onClick();
    }
    if (link) {
      navigate(link);
    }
  };

  return (
    <motion.button
      whileHover={{
        backgroundColor: backgroundColorOnHover,
        color: textColorOnHover,
      }}
      transition={{ duration: 0.3 }}
      style={{ backgroundColor: backgroundColorOnInit, color: textColorOnInit }}
      onClick={handleClick}
      className={className}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedHoverButton;
