import React from "react";
import AboutUsCardAndDataSection from "../components/section/AboutUsCardAndDataSection";
import AnimatedPage from "../animation/AnimatedPage";

const AboutUs = () => {
  return (
    <AnimatedPage>
      <div className="font-lato flex-col items-center w-full h-auto flex justify-center bg-custom-gray-300">
        <AboutUsCardAndDataSection />
      </div>
    </AnimatedPage>
  );
};

export default AboutUs;
