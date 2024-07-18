import React from "react";
import ButtonWithLink from "../universal/ButtonWithLink";

const ForumAttemptToCreatePostWhenNotLogged = ({ close: setOpenModal }) => {
  return (
    <div className="fixed font-lato inset-0 flex items-center justify-center z-20">
      <div className="fixed inset-0 bg-black backdrop-blur-lg bg-opacity-40 "></div>
      <div className="bg-custom-gray-100 gap-6 w-[650px] flex flex-col items-center h-auto p-8 rounded-2xl z-10">
        <h2 className="text-4xl font-bold">Informacja</h2>
        <p className="text-2xl">
          Aby utworzyć post na forum, musisz się zalogować!
        </p>
        <ButtonWithLink
          title={"Zaloguj się"}
          link={"/sign-in"}
          styling={
            "w-[50%] font-bold uppercase text-xl text-white h-[50px] flex items-center justify-center bg-custom-orange-100 py-1 rounded-full"
          }
        />
        <button
          onClick={() => setOpenModal(false)}
          className="w-[50%] uppercase font-bold text-xl text-white h-[50px] flex items-center justify-center bg-custom-orange-100 py-1 rounded-full"
        >
          {"Pozostań na forum"}
        </button>
      </div>
    </div>
  );
};

export default ForumAttemptToCreatePostWhenNotLogged;
