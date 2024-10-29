import React from "react";
import HamburgerIcon from "../../icons/HamburgerIcon.jsx";
import DrawerList from "../list/DrawerList.jsx";
import DrawerContainer from "./DrawerContainer.jsx";
import AnimatedCancelButton from "../button/AnimatedCancelButton.jsx";

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
          <AnimatedCancelButton
            className={"ml-auto bg-custom-gray-100 rounded-full"}
            onClick={toggleDrawer}
            iconSize={"size-12"}
          />
        </div>
        <div className="my-8 overflow-y-auto h-[80%]">
          <DrawerList />
        </div>
      </DrawerContainer>
    </div>
  );
};

export default LeftDrawer;
