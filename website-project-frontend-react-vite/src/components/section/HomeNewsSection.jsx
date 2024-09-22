import React from "react";
import MainBannerWithoutLogo from "../universal/MainBannerWithoutLogo.jsx";
import HomeNewsCardSlider from "../card-slider/HomeNewsCardSlider.jsx";
import { useQuery } from "react-query";
import { fetchHomeNewsPostsData } from "../../helpers/api-integration/NewsPostsHandling.js";
import Spinner from "../universal/Spinner.jsx";

const HomeNewsSection = () => {
  const { data: homeNewsPosts, isLoading: fetchingHomeNewsPosts } = useQuery(
    ["homeNewsPostsData"],
    () => fetchHomeNewsPostsData(),
  );

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
