import BellIcon from "./icons/BellIcon.jsx";
import UserIcon from "./icons/UserIcon.jsx";
import LeftDrawer from "../drawer/LeftDrawer";
import MainBannerWithLogo from "../universal/MainBannerWithLogo";
import React from "react";
import RightDrawer from "../drawer/RightDrawer";
import { useLocation, useNavigate } from "react-router-dom";
import AnimatedPage from "../../animation/AnimatedPage";

const Header = ({ forumAddPostButton }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleRightDrawer = () => {
    setIsOpen(!isOpen);
  };

  const headerNavigationData = [
    {
      name: "O nas",
      link: "/about-us",
    },
    {
      name: "Kontakt",
      link: "/contact-us",
    },
    {
      name: "Sklep",
      link: "/rainbow-shop",
    },
    {
      name: "Strona główna",
      link: "/",
    },
  ];

  const getHeaderItemsDependsOnLocation = () => {
    const commonItems = [headerNavigationData[1], headerNavigationData[2]];

    switch (location.pathname) {
      case "/support-us": {
        return [headerNavigationData[3], ...commonItems];
      }
      case "/news": {
        return [headerNavigationData[3], ...commonItems];
      }
      case "/forum": {
        return [];
      }
      default: {
        return [headerNavigationData[0], ...commonItems];
      }
    }
  };

  return (
    <header className="flex h-[125px] pl-4 w-full border-0 border-violet-700">
      <div className="flex w-full items-center">
        <LeftDrawer />
        <MainBannerWithLogo
          imageContainerStyling={"max-xl:size-[50px] xl:size-[75px]"}
          mainContainerStyling={"max-xl:w-[350px] xl:w-[450px]"}
        />
        <div
          className={`ml-auto flex h-[125px] max-xl:w-[450px] xl:w-[600px] relative items-center justify-center bg-header-background`}
        >
          {location.pathname === "/forum" && forumAddPostButton}
          <div
            className={`flex h-[50px] translate-x-4 items-center justify-center rounded-full bg-custom-gray-100 ${location.pathname === "/forum" ? "w-[150px] ml-auto mr-6" : " max-xl:w-[400px] xl:w-[550px]"}`}
          >
            <ul className="flex gap-10 list-disc list-inside marker:text-lg marker:text-custom-gray-400">
              {getHeaderItemsDependsOnLocation().map((data, index) => (
                <li>
                  <button onClick={() => navigate(data.link)}>
                    {data.name}
                  </button>
                </li>
              ))}
            </ul>
            <div
              className={`relative flex gap-4 ${location.pathname !== "/forum" && "ml-8"}`}
            >
              <span className="rounded-full bg-white p-1">
                <BellIcon />
              </span>
              <button
                onClick={toggleRightDrawer}
                className="flex items-center rounded-full bg-white p-1 justify-center"
              >
                <UserIcon size={"size-6"} />
              </button>
            </div>
          </div>
        </div>
        <RightDrawer isOpen={isOpen} closeFunction={toggleRightDrawer} />
      </div>
    </header>
  );
};

export default Header;
