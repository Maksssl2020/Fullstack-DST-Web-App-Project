import React from "react";
import HomeNewsCard from "../card/HomeNewsCard.jsx";
import MainBannerWithoutLogo from "../universal/MainBannerWithoutLogo";
import HomeNewsCardSlider from "../card-slider/HomeNewsCardSlider";

const HomeNewsSection = () => {
  return (
    <div className="flex h-[1000px] w-full flex-col bg-custom-gray-300">
      <MainBannerWithoutLogo bannerTitle={"Tęczowe Wiadomości"} />
      <div className="bg-custom-blue-200 mt-8 h-[950px] w-full py-8">
        <HomeNewsCardSlider />
      </div>
    </div>
  );
};

export default HomeNewsSection;
