import React from "react";
import { motion } from "framer-motion";
import useWindowWidth from "../../hooks/others/useWindowWidth.js";
import { useLocation, useNavigate } from "react-router-dom";

const ForumBanner = () => {
  const width = useWindowWidth();
  const [isHovering, setHovering] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isSmallerThanSizeLgAndIsMainForumPage =
    width < 1024 && !location.pathname.includes("create-post");

  return (
    <div className={"w-full h-[120px] flex flex-col items-center relative"}>
      <div className="w-[90%] z-10 relative px-8 h-[75px] flex justify-center items-center rounded-full bg-custom-blue-400">
        <p className="w-[80%] max-sm:h-0.5 h-1 bg-white bg-gradient-to-l from-25% from-white to-custom-blue-400 "></p>
        <h1 className="text-white text-center max-sm:text-sm sm:text-xl md:text-2xl lg:text-4xl w-[85%] font-bold">
          Tęczowe Forum
        </h1>
        <p className="w-[80%] max-sm:h-0.5 h-1 bg-white from-25% bg-gradient-to-r from-white to-custom-blue-400 "></p>
      </div>
      {isSmallerThanSizeLgAndIsMainForumPage && (
        <motion.div
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          initial={{ y: -30 }}
          animate={isHovering ? { y: -1 } : { y: -30 }}
          exit={{ y: -30 }}
          transition={{ duration: 0.2 }}
          className={
            "absolute w-[250px] bottom-0  h-[75px] flex justify-center items-center text-white font-bold bg-custom-blue-500 rounded-2xl"
          }
        >
          <motion.button
            initial={{ y: -15 }}
            animate={isHovering ? { y: 15 } : { y: -15 }}
            exit={{ y: -15 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate("/forum/create-post")}
            className={"uppercase font-bold w-full"}
          >
            Stwórz wpis
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default ForumBanner;
