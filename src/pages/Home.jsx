import React from "react";
import HomeAboutUsSection from "../components/section/HomeAboutUsSection.jsx";
import HomeNewsSection from "../components/section/HomeNewsSection.jsx";
import HomeInstagramSection from "../components/section/HomeInstagramSection.jsx";

const Home = () => {
  return (
    <div className="w-full">
      <div className="mt-6 flex h-[200px] items-center justify-center bg-custom-gray-200">
        <div className="font-lato bg-custom-blue-200 flex h-[75px] w-2/5 items-center justify-center rounded-full text-3xl font-medium text-white">
          {"Zespół Dwóch Stron Tęczy wita Cię serdecznie <3"}
        </div>
      </div>
      <div>
        <HomeAboutUsSection />
      </div>
      <div className="mt-16">
        <HomeNewsSection />
      </div>
      <div className="mt-16">
        <HomeInstagramSection />
      </div>
    </div>
  );
};

export default Home;
