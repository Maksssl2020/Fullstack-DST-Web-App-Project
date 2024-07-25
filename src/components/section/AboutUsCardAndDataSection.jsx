import React from "react";
import { aboutUsData } from "../../data/AboutUsPageData";
import AboutUsDataCard from "../card/AboutUsDataCard";
import LineWithCircleOnLeftSide from "../universal/LineWithCircleOnLeftSide";
import LineWithCircleOnRightSide from "../universal/LineWithCircleOnRightSide";
import "./AboutUsCardAndDataSection.css";
import AboutUsIconList from "../list/AboutUsIconList";

const AboutUsCardAndDataSection = () => {
  return (
    <>
      <div className="max-xl:w-[1000px] max-2xl:w-[1250px] 2xl:w-[1480px] [1750px]:w-[1650px] z-10 rounded-2xl my-28">
        {aboutUsData.map((data, index) => (
          <AboutUsDataCard key={index} cardData={data} index={index} />
        ))}
      </div>
      <div className="w-full -translate-y-[125px] flex flex-col p-8 items-center rounded-b-2xl bg-white h-[550px]">
        <div className="max-2xl:w-[650px] 2xl:w-[750px] h-[125px] p-6 animated-rainbow-gradient rounded-full bg-custom-blue-200">
          <div className="w-full flex gap-6 justify-center items-center h-full bg-white rounded-full">
            <LineWithCircleOnLeftSide />
            <h1 className="font-bold max-2xl:text-4xl 2xl:text-5xl">
              Nasi Partnerzy:
            </h1>
            <LineWithCircleOnRightSide />
          </div>
        </div>
        <div className="max-2xl:w-[650px] 2xl:w-[750px] translate-y-28 h-[175px] mt-auto p-6 animated-rainbow-gradient rounded-3xl bg-custom-blue-200">
          <div className="w-full flex gap-6 justify-center items-center h-full bg-white rounded-3xl">
            <AboutUsIconList />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsCardAndDataSection;
