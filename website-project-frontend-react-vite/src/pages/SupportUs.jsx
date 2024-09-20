import React from "react";
import SupportUsPaymentSection from "../components/section/SupportUsPaymentSection.jsx";
import MainBannerWithoutLogo from "../components/universal/MainBannerWithoutLogo.jsx";
import SupportUsTraditionalTransferDataSection from "../components/section/SupportUsTraditionalTransferDataSection.jsx";
import SupportUsIInformationAboutUsSection from "../components/section/SupportUsIInformationAboutUsSection.jsx";
import AnimatedPage from "../animation/AnimatedPage.jsx";

const SupportUs = () => {
  return (
    <AnimatedPage>
      <div className="w-full h-full">
        <div className="w-full font-lato pt-8 flex justify-center gap-8 flex-col items-center h-full bg-custom-gray-300">
          <MainBannerWithoutLogo
            bannerTitle={"Wesprzyj nas i nasze działania"}
          />
          <div className="bg-white justify-center items-center flex-col gap-8 flex w-[1350px] my-8 h-auto rounded-2xl p-6">
            <SupportUsPaymentSection />
            <SupportUsTraditionalTransferDataSection />
            <SupportUsIInformationAboutUsSection />
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default SupportUs;
