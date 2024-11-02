import React from "react";
import { aboutUsData } from "../../data/AboutUsPageData.js";
import AboutUsDataCard from "../card/AboutUsDataCard.jsx";
import LineWithCircleOnLeftSide from "../universal/LineWithCircleOnLeftSide.jsx";
import LineWithCircleOnRightSide from "../universal/LineWithCircleOnRightSide.jsx";
import AboutUsIconList from "../list/AboutUsIconList.jsx";

const AboutUsCardAndDataSection = () => {
  return (
    <div
      className={
        "max-lg:w-[95%] lg:w-[950px] xl:w-[1250px] flex flex-col pb-12"
      }
    >
      <div className="z-10 rounded-2xl ">
        {aboutUsData.map((data, index) => (
          <AboutUsDataCard key={index} cardData={data} index={index} />
        ))}
      </div>
      <div className="w-full -translate-y-[25px] flex flex-col max-md:py-8 md:p-8 items-center rounded-b-2xl bg-white h-[550px]">
        <div className=" max-md:w-[95%] max-2xl:w-[650px] 2xl:w-[750px] max-md:h-[75px] md:h-[125px] max-md:p-2 md:p-6 animated-rainbow-gradient rounded-full bg-custom-blue-200">
          <div className="w-full flex gap-6 justify-center items-center h-full bg-white rounded-full">
            <LineWithCircleOnLeftSide />
            <h1 className="font-bold max-sm:text-lg max-md:text-2xl max-2xl:text-4xl 2xl:text-5xl">
              Nasi Partnerzy:
            </h1>
            <LineWithCircleOnRightSide />
          </div>
        </div>
        <div className="max-md:w-[95%] max-2xl:w-[650px] 2xl:w-[750px] translate-y-28 max-sm:h-[100px] max-md:h-[125px] md:h-[175px] mt-auto max-md:p-3 md:p-6 animated-rainbow-gradient rounded-2xl ">
          <div className="w-full flex gap-6 justify-center items-center h-full bg-white rounded-3xl">
            <AboutUsIconList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsCardAndDataSection;
