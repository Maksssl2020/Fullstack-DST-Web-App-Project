import React from "react";
import AboutUsCardAndDataSection from "../components/section/AboutUsCardAndDataSection.jsx";
import Page from "../components/section/Page.jsx";

const AboutUs = () => {
  return (
    <Page className={"flex justify-center bg-custom-gray-400"}>
      <AboutUsCardAndDataSection />
    </Page>
  );
};

export default AboutUs;
