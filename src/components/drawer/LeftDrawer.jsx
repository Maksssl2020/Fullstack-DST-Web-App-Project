import React from "react";
import HamburgerIcon from "../header/icons/HamburgerIcon";
import CloseIcon from "./icons/CloseIcon";
import DrawerList from "../list/DrawerList";
import MainBannerWithLogo from "../universal/MainBannerWithLogo";

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
        className={`font-lato flex z-30 overflow-y-auto transition-transform inset-0 fixed h-screen w-[25%] bg-custom-gray-200 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="w-full flex flex-col">
          <div className="flex px-4 items-center justify-center gap-4 h-[12.5%] bg-drawer-background w-full">
            <input
              placeholder={"Szukaj . . . . . ."}
              className="h-[50px] text-lg p-4 focus:outline-none placeholder:font-bold placeholder:text-2xl  placeholder:text-black w-[75%] rounded-full bg-custom-gray-100"
            />
            <button
              className="rounded-full h-fit bg-custom-gray-100"
              onClick={toggleDrawer}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="my-8">
            <DrawerList />
          </div>
          <p className="mt-auto mb-12">
            <MainBannerWithLogo
              imageContainerStyling={"h-[55px] w-[55px]"}
              mainContainerStyling={"w-[90%]"}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftDrawer;
