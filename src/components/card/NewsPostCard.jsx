import React from "react";
import PostBannerWithLogoAndDate from "../universal/PostBannerWithLogoAndDate";

const NewsPostCard = ({ height, backgroundColor, date, description }) => {
  return (
    <div
      style={{ height: `${Number.parseFloat(height)}px` }}
      className="w-[400px] bg-white rounded-lg p-2"
    >
      <div
        className={`size-full rounded-lg flex`.concat(" " + backgroundColor)}
      >
        <div className="w-full p-5 flex flex-col min-h-[275px] h-auto rounded-lg mt-auto bg-custom-gray-100">
          <PostBannerWithLogoAndDate
            authorName={"Dwie Strony Tęczy"}
            date={"09.03.2024"}
          />
          <p className="text-justify mt-6">
            jest poszanowaniem cudzuch uczuć, poglądów, upodobań, wierzeń,
            obyczajów i postępowania, choćby były całkowicie odmienne od naszych
            albo zupełnie z nimi sprzeczne
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsPostCard;
