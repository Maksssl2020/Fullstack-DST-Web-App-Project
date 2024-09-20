import React from "react";
import AboutUsCardAndDataSection from "../components/section/AboutUsCardAndDataSection.jsx";
import AnimatedPage from "../animation/AnimatedPage.jsx";

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
