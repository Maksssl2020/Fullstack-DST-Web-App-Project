import React from "react";
import MainBannerWithoutLogo from "../universal/MainBannerWithoutLogo.jsx";
import HomeNewsCardSlider from "../card-slider/HomeNewsCardSlider.jsx";
import Spinner from "../universal/Spinner.jsx";
import useHomeNewsPosts from "../../hooks/queries/useHomeNewsPosts.js";

const HomeNewsSection = () => {
  const { homeNewsPosts, fetchingHomeNewsPosts } = useHomeNewsPosts();

  if (fetchingHomeNewsPosts) {
    return <Spinner />;
  }

  return (
    <div className="flex h-auto w-full flex-col bg-custom-gray-300">
      <div className="w-full relative h-[125px] flex justify-center items-center">
        <MainBannerWithoutLogo bannerTitle={"Tęczowe Wiadomości"} />
      </div>
      <div className="h-auto flex justify-center w-full py-8">
        <HomeNewsCardSlider sliderData={homeNewsPosts} />
      </div>
    </div>
  );
};

export default HomeNewsSection;
