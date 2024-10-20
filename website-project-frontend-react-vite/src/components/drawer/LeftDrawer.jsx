import React from "react";
import HamburgerIcon from "../header/icons/HamburgerIcon.jsx";
import CloseIcon from "./icons/CloseIcon.jsx";
import DrawerList from "../list/DrawerList.jsx";
import MainBannerWithLogo from "../universal/MainBannerWithLogo.jsx";
import DrawerContainer from "./DrawerContainer.jsx";
import { motion } from "framer-motion";

const LeftDrawer = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="transition-all duration-300 ease-in-out">
      <button
        onClick={toggleDrawer}
        className="flex size-12 items-center justify-center rounded-full bg-custom-gray-100"
      >
        <HamburgerIcon />
      </button>

      <DrawerContainer
        drawerSide={"LEFT"}
        isOpen={isOpen}
        closeFunction={toggleDrawer}
        drawerHeaderBackground={"bg-drawer-background"}
      >
        <div
          className={`flex px-4 items-center justify-center gap-4 h-[11.5%] w-full bg-drawer-background`}
        >
          <motion.button
            whileHover={{ rotate: 180, transition: { duration: 0.3 } }}
            className="rounded-full h-fit ml-auto mr-8"
            onClick={toggleDrawer}
          >
            <CloseIcon size="size-12" />
          </motion.button>
        </div>
        <div className="my-8 overflow-y-auto h-[80%]">
          <DrawerList />
        </div>
      </DrawerContainer>
    </div>
  );
};

export default LeftDrawer;
