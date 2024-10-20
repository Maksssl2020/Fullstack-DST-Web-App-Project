import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import MainBannerWithLogo from "../universal/MainBannerWithLogo.jsx";

const DrawerContainer = ({ isOpen, closeFunction, drawerSide, children }) => {
  const openDirection = drawerSide === "LEFT" ? "-100%" : "100%";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, type: "spring" }}
            onClick={closeFunction}
            className="fixed inset-0 z-30 bg-black bg-opacity-40 backdrop-blur-sm"
          ></motion.div>

          <motion.div
            initial={{ x: openDirection, opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: openDirection, opacity: 0 }}
            transition={{ duration: 0.2, type: "just" }}
            className={`font-lato flex-col top-0 flex z-30 fixed h-screen w-[490px] bg-custom-gray-200 ${drawerSide === "LEFT" ? "left-0" : "right-0"}`}
          >
            <div className="flex flex-col items-center w-full h-full">
              <div className={"w-full h-[90%]"}>{children}</div>
              <div className="bottom-0 h-[10%] w-full">
                <MainBannerWithLogo
                  imageContainerStyling={"h-[55px] w-[55px]"}
                  mainContainerStyling={"w-[90%] h-[75px]"}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DrawerContainer;
