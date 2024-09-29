import React from "react";
import HamburgerIcon from "../header/icons/HamburgerIcon.jsx";
import CloseIcon from "./icons/CloseIcon.jsx";
import DrawerList from "../list/DrawerList.jsx";
import MainBannerWithLogo from "../universal/MainBannerWithLogo.jsx";

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

      {isOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 z-30 bg-black bg-opacity-40 backdrop-blur-sm"
        ></div>
      )}

      <div
        className={`font-lato  flex z-30 transition-transform inset-0 fixed h-screen w-[490px] bg-custom-gray-200 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="w-full h-full flex flex-col ">
          <div className="flex px-4 items-center justify-center gap-4 h-[11.5%] bg-drawer-background w-full ">
            <button
              className="rounded-full h-fit bg-custom-gray-100"
              onClick={toggleDrawer}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="my-8 overflow-y-auto">
            <DrawerList />
          </div>
          <div className="mt-auto mb-12">
            <MainBannerWithLogo
              imageContainerStyling={"h-[55px] w-[55px]"}
              mainContainerStyling={"w-[90%]"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftDrawer;
