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
      <div className="w-full z-10 rounded-2xl my-28 h-[3500px]">
        {aboutUsData.map((data, index) => (
          <AboutUsDataCard key={index} cardData={data} index={index} />
        ))}
      </div>
      <div className="w-full -translate-y-[125px] flex flex-col p-8 items-center rounded-b-2xl bg-white h-[550px]">
        <div className="w-[45%] h-[125px] p-6 animated-rainbow-gradient rounded-full bg-custom-blue-200">
          <div className="w-full flex gap-6 justify-center items-center h-full bg-white rounded-full">
            <LineWithCircleOnLeftSide />
            <h1 className="font-bold text-5xl">Nasi Partnerzy:</h1>
            <LineWithCircleOnRightSide />
          </div>
        </div>
        <div className="w-[45%] translate-y-28 h-[175px] mt-auto p-6 animated-rainbow-gradient rounded-3xl bg-custom-blue-200">
          <div className="w-full flex gap-6 justify-center items-center h-full bg-white rounded-3xl">
            <AboutUsIconList />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsCardAndDataSection;
