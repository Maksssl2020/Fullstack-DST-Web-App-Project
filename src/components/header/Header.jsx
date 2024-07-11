import HamburgerIcon from "./icons/HamburgerIcon.jsx";
import BellIcon from "./icons/BellIcon.jsx";
import UserIcon from "./icons/UserIcon.jsx";
import LeftDrawer from "../drawer/LeftDrawer";
import MainBannerWithLogo from "../universal/MainBannerWithLogo";
import React from "react";
import RightDrawer from "../drawer/RightDrawer";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleRightDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-[125px] pl-4 w-full border-0 border-violet-700">
      <div className="flex w-full items-center">
        <LeftDrawer />
        <MainBannerWithLogo
          imageContainerStyling={"w-[75px] h-[75px]"}
          mainContainerStyling={"w-[450px]"}
        />
        <div className="ml-auto flex h-[125px] w-[600px] relative items-center justify-center bg-header-background">
          <div className="flex h-[50px] w-[550px] translate-x-4 items-center justify-center rounded-full bg-custom-gray-100">
            <ul className="flex gap-10">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-custom-gray-400"></span>
                O nas
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-custom-gray-400"></span>
                Kontakt
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-custom-gray-400"></span>
                Sklep
              </li>
            </ul>
            <div className="ml-8 relative flex gap-4">
              <span className="rounded-full bg-white p-1">
                <BellIcon />
              </span>
              <button
                onClick={toggleRightDrawer}
                className="flex items-center rounded-full bg-white p-1 justify-center"
              >
                <UserIcon />
              </button>
            </div>
          </div>
        </div>
        <RightDrawer isOpen={isOpen} closeFunction={toggleRightDrawer} />
      </div>
    </div>
  );
};

export default Header;
