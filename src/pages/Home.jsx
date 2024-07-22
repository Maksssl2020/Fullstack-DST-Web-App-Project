import React from "react";
import HomeAboutUsSection from "../components/section/HomeAboutUsSection.jsx";
import HomeNewsSection from "../components/section/HomeNewsSection.jsx";
import HomeInstagramSection from "../components/section/HomeInstagramSection.jsx";
import FacebookLogin from "../components/table/FacebookLogin";

const Home = () => {
  return (
    <div className="w-full">
      <div className="mt-8 flex items-center h-[200px] bg-custom-gray-200">
        <div className="font-lato bg-custom-blue-300 flex h-[100px] italic w-2/5 items-center ml-[15%] justify-center rounded-full text-3xl font-medium text-white">
          {"Zespół Dwóch Stron Tęczy wita Cię serdecznie <3"}
        </div>
        {/*<FacebookLogin />*/}
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
