import React from "react";
import PostBannerWithLogoAndDate from "../universal/PostBannerWithLogoAndDate";

const HomeNewsCard = () => {
  return (
    <div className="h-[650px] w-[450px] rounded-lg bg-white p-4">
      <div className="h-full w-full rounded-lg bg-custom-gray-100">
        <div className="relative z-20 h-[65%] w-full rounded-lg border-4 border-black bg-custom-gray-100">
          <img
            className="inset-0 z-20 h-full w-full rounded-lg object-cover"
            src="/assets/images/test_img.jpg"
            alt=""
          />
        </div>
        <div className="z-10 h-[40%] w-full -translate-y-7 rounded-b-lg bg-custom-gray-100 px-8 py-6">
          <PostBannerWithLogoAndDate
            authorName={"Dwie Strony Tęczy"}
            date={"09.02.2024"}
          />
          <p className="mt-4 text-justify">
            Jeśli chodzi o psychologiczne przyczyny rozwoju depresji, mogą nimi
            być m.in. traumatyczne wydarzenia, niska zdolność radzenia sobie ze
            stresem, czynniki osobowościowe...
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeNewsCard;
