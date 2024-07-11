import React from "react";
import CloseIcon from "./icons/CloseIcon";
import GoogleIcon from "./icons/GoogleIcon";
import AppleIcon from "./icons/AppleIcon";
import EmiailIcon from "./icons/EmiailIcon";
import MainBannerWithLogo from "../universal/MainBannerWithLogo";

const RightDrawer = ({ isOpen, closeFunction }) => {
  return (
    <div className="transition-all duration-300 ease-in-out">
      {isOpen && (
        <div
          onClick={closeFunction}
          className="fixed inset-0 z-30 bg-black bg-opacity-40 backdrop-blur-sm"
        ></div>
      )}

      <div
        className={`font-lato flex-col right-0 top-0 flex z-30 overflow-y-auto transition-transform fixed h-screen w-[25%] bg-custom-gray-200 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col items-center w-full">
          <div className="w-full flex h-[12.5%] mt-8 justify-center items-center">
            <div className="flex gap-4 justify-center items-center w-[80%] h-[75px] rounded-full bg-custom-gray-300">
              <button
                className="rounded-full h-fit bg-custom-gray-100"
                onClick={closeFunction}
              >
                <CloseIcon />
              </button>
              <div className="flex w-[70%] items-center justify-center text-xl font-bold h-[50px] bg-custom-gray-100 rounded-full">
                <p>Skontaktuj się z nami</p>
              </div>
            </div>
          </div>
          <div className="bg-drawer-background mt-8 flex justify-center items-center w-full h-[12.5%]">
            <p className="font-bold text-5xl">tęczowe konto</p>
          </div>
          <div className="w-[90%] relative text-white text-center text-3xl items-center py-8 gap-8 flex flex-col h-[350px] mt-28 rounded-lg bg-custom-gray-100">
            <p className="bg-custom-orange-100 py-1 text w-[65%] h-[50px] rounded-full">
              Zaloguj
            </p>
            <p className="bg-custom-orange-100 py-1 w-[65%] h-[50px] rounded-full">
              Zarejestruj
            </p>
            <div className="flex items-center justify-center bg-custom-gray-300 rounded-full w-[105%] h-[75px]">
              <div className="h-[75%] px-16 justify-between items-center flex w-[95%] bg-white rounded-full">
                <GoogleIcon />
                <AppleIcon />
                <EmiailIcon />
              </div>
            </div>
          </div>
        </div>
        <p className="mt-auto mb-12">
          <MainBannerWithLogo
            imageContainerStyling={"h-[55px] w-[55px]"}
            mainContainerStyling={"w-[90%]"}
          />
        </p>
      </div>
    </div>
  );
};

export default RightDrawer;
