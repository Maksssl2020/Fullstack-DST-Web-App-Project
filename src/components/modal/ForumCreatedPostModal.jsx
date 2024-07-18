import React from "react";
import ButtonWithLink from "../universal/ButtonWithLink";

const ForumCreatedPostModal = () => {
  return (
    <div className="fixed font-lato inset-0 flex items-center justify-center z-20">
      <div className="fixed inset-0 bg-black backdrop-blur-lg bg-opacity-40"></div>
      <div className="bg-custom-gray-100 gap-6 w-[650px] h-auto flex flex-col items-center p-8 rounded-2xl z-20">
        <h2 className="text-4xl font-bold">Nowy wpis został utworzony!</h2>
        <p className="text-2xl">
          Przejdź na stronę główną forum, aby go zobaczyć.
        </p>
        <ButtonWithLink
          title={"Strona Główna Forum"}
          link={"/forum"}
          styling={
            "w-[50%] font-bold uppercase text-xl text-white h-[50px] flex items-center justify-center bg-custom-orange-100 py-1 rounded-full"
          }
        />
        <ButtonWithLink
          title={"Strona główna"}
          link={"/"}
          styling={
            "w-[50%] uppercase font-bold text-xl text-white h-[50px] flex items-center justify-center bg-custom-orange-100 py-1 rounded-full"
          }
        />
      </div>
    </div>
  );
};

export default ForumCreatedPostModal;
