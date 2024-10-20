import React from "react";
import CloseIcon from "./icons/CloseIcon.jsx";
import GoogleIcon from "./icons/GoogleIcon.jsx";
import AppleIcon from "./icons/AppleIcon.jsx";
import EmiailIcon from "./icons/EmiailIcon.jsx";
import { Link, useNavigate } from "react-router-dom";
import useAuthentication from "../../hooks/queries/useAuthentication.js";
import DrawerContainer from "./DrawerContainer.jsx";

const RightDrawer = ({ isOpen, closeFunction }) => {
  const { logout, isAuthenticated } = useAuthentication();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    closeFunction();
  };

  return (
    <DrawerContainer
      isOpen={isOpen}
      drawerSide={"RIGHT"}
      closeFunction={closeFunction}
    >
      <div className="flex flex-col items-center w-full">
        <div className="w-full flex h-[11.5%] mt-8 justify-center items-center">
          <div className="flex gap-4 justify-center items-center w-[80%] h-[75px] rounded-full bg-custom-gray-300">
            <button
              className="rounded-full h-fit bg-custom-gray-100"
              onClick={closeFunction}
            >
              <CloseIcon size="size-12" />
            </button>
            <div className="flex w-[70%] items-center justify-center text-xl font-bold h-[50px] bg-custom-gray-100 rounded-full">
              <Link to={"/contact-us"}>
                <p>Skontaktuj się z nami</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-drawer-background mt-8 flex justify-center items-center w-full h-[75px]">
          <p className="font-bold text-5xl">tęczowe konto</p>
        </div>
        <div className="w-[90%] relative text-white text-center text-3xl items-center py-8 gap-8 flex flex-col h-auto mt-28 rounded-lg bg-custom-gray-100">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-[65%] h-[50px] bg-custom-orange-200 py-1 rounded-full"
            >
              WYLOGUJ SIĘ
            </button>
          ) : (
            <>
              <Link to={"/sign-in"} className="w-[65%] h-[50px]">
                <p className="bg-custom-orange-200 py-1 rounded-full">
                  Zaloguj
                </p>
              </Link>
              <Link
                to={"/sign-up"}
                className="w-[65%] bg-custom-orange-200 py-1 rounded-full h-[50px]"
              >
                <p>Zarejestruj</p>
              </Link>
              <div className="flex items-center justify-center bg-custom-gray-300 rounded-full w-[105%] h-[75px]">
                <div className="h-[75%] px-16 justify-between items-center flex w-[95%] bg-white rounded-full">
                  <GoogleIcon />
                  <AppleIcon />
                  <EmiailIcon />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </DrawerContainer>
  );
};

export default RightDrawer;
