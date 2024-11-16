import React from "react";
import GoogleIcon from "./icons/GoogleIcon.jsx";
import AppleIcon from "./icons/AppleIcon.jsx";
import EmiailIcon from "./icons/EmiailIcon.jsx";
import { Link, useNavigate } from "react-router-dom";
import useAuthentication from "../../hooks/others/useAuthentication.js";
import DrawerContainer from "./DrawerContainer.jsx";
import AnimatedCancelButton from "../button/AnimatedCancelButton.jsx";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authenticationSlice";

type RightDrawerProps = {
  isOpen: boolean;
  closeDrawer: () => void;
};

const RightDrawer = ({ isOpen, closeDrawer }: RightDrawerProps) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuthentication();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    closeDrawer();
  };

  return (
    <DrawerContainer
      isOpen={isOpen}
      drawerSide={"RIGHT"}
      closeFunction={closeDrawer}
    >
      <div className="flex w-full flex-col items-center">
        <div className="mt-8 flex h-[11.5%] w-full items-center justify-center">
          <div className="flex h-[75px] w-[80%] items-center justify-center gap-4 rounded-full bg-custom-gray-300">
            <AnimatedCancelButton
              className={"rounded-full bg-custom-gray-100"}
              onClick={closeDrawer}
              iconSize={"size-12"}
            />
            <div className="flex h-[50px] w-[70%] items-center justify-center rounded-full bg-custom-gray-100 text-xl font-bold">
              <Link to={"/contact-us"}>
                <p>Skontaktuj się z nami</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 flex h-[75px] w-full items-center justify-center bg-drawer-background">
          <p className="text-5xl font-bold">tęczowe konto</p>
        </div>
        <div className="relative mt-28 flex h-auto w-[90%] flex-col items-center gap-8 rounded-lg bg-custom-gray-100 py-8 text-center text-3xl text-white">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="h-[50px] w-[65%] rounded-full bg-custom-orange-200 py-1"
            >
              WYLOGUJ SIĘ
            </button>
          ) : (
            <>
              <Link to={"/sign-in"} className="h-[50px] w-[65%]">
                <p className="rounded-full bg-custom-orange-200 py-1">
                  Zaloguj
                </p>
              </Link>
              <Link
                to={"/sign-up"}
                className="h-[50px] w-[65%] rounded-full bg-custom-orange-200 py-1"
              >
                <p>Zarejestruj</p>
              </Link>
              <div className="flex h-[75px] w-[105%] items-center justify-center rounded-full bg-custom-gray-300">
                <div className="flex h-[75%] w-[95%] items-center justify-between rounded-full bg-white px-16">
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
