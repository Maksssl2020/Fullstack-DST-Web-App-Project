import React, { useContext } from "react";
import UserIcon from "../header/icons/UserIcon";
import { TodayDate } from "../../helpers/Date";
import { AuthContext } from "../../helpers/provider/AuthProvider";

const ForumPostCard = () => {
  const { role } = useContext(AuthContext);

  return (
    <div className="w-[85%] p-8 h-[650px] items-center justify-center flex gap-6 mt-8 bg-custom-blue-200 rounded-2xl">
      <div className="w-[50%] justify-between h-full rounded-2xl flex flex-col items-center p-4 bg-custom-gray-100">
        <div className="w-full h-[50px] flex text-white font-bold items-center justify-center text-4xl rounded-full bg-custom-blue-400">
          Coming out
        </div>
        <textarea
          readOnly
          className="w-full resize-none focus:outline-none hover:cursor-auto p-4 text-xl h-[60%] bg-custom-gray-200 rounded-xl"
        ></textarea>
        <div className="w-full relative flex flex-col h-[100px]">
          <p className="w-[55%] text-white flex justify-center absolute rounded-2xl right-0 h-[75px] pb-4 text-2xl font-bold bg-custom-blue-200">
            {TodayDate()}
          </p>
          <div className="z-10 text-white text-4xl font-bold mt-auto bg-custom-blue-400 flex px-2 items-center h-[65px] rounded-full">
            <p className="bg-white text-black mr-4 border-2 border-custom-blue-400 rounded-full flex justify-center items-center size-14">
              <UserIcon size={"size-8"} />
            </p>
            Anonimowy
          </div>
        </div>
      </div>
      <div className="w-[45%] justify-between flex flex-col h-full p-4 rounded-2xl bg-custom-gray-100">
        <div className="w-full h-[50px] flex text-white font-bold items-center justify-center text-4xl rounded-full bg-custom-blue-400">
          Komentarze
        </div>
        <div className="h-[65px] flex w-full">
          <div className="w-[25%] h-full flex items-center justify-center pr-6  bg-custom-gray-200 rounded-l-full">
            {role === "ADMIN" ? (
              <img
                className="inset-0 size-12 rounded-full"
                src="/assets/images/website-logo.jpg"
                alt="ADMIN_LOGO"
              />
            ) : (
              <div className="bg-white rounded-full size-12 flex justify-center items-center">
                <UserIcon size="size-8" />
              </div>
            )}
          </div>
          <input
            placeholder={"Napisz komentarz . . . . . . . "}
            className="h-full focus:outline-none text-xl placeholder:text-black w-[75%] ml-auto rounded-r-full bg-custom-gray-200"
          />
        </div>
      </div>
    </div>
  );
};

export default ForumPostCard;
