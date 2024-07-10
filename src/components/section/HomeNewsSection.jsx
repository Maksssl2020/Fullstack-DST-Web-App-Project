import React from "react";
import NewsCard from "../card/NewsCard.jsx";

const HomeNewsSection = () => {
  return (
    <div className="flex h-[1000px] w-full flex-col bg-custom-gray-300">
      <div className="mt-8 flex h-[75px] w-1/2 justify-center self-center rounded-full bg-custom-gray-100">
        <div className="flex h-full w-4/5 items-center justify-between rounded-full bg-white px-4">
          <p className="h-0.5 w-8 bg-black"></p>
          <p className="font-lato text-5xl font-bold">Tęczowe Wiadomości</p>
          <p className="h-0.5 w-8 bg-black"></p>
        </div>
      </div>
      <div className="bg-custom-blue-200 mt-8 flex h-[750px] w-full justify-center gap-16 py-8">
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </div>
    </div>
  );
};

export default HomeNewsSection;
