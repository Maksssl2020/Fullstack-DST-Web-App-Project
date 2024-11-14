import React from "react";
import ContactUsContactDataPanel from "../panel/ContactUsContactDataPanel.jsx";
import ContactUsHotlineDataPanel from "../panel/ContactUsHotlineDataPanel.jsx";

const ContactUsSection = () => {
  return (
    <div className="max-lg:w-[95%] lg:w-[950px] xl:w-[1250px] max-lg:h-auto lg:h-[725px] xl:h-[850px] max-sm:p-6 sm:p-10 md:p-12 rounded-2xl bg-custom-pink-300">
      <div className="w-full h-full bg-white max-sm:p-4 sm:p-8 rounded-2xl flex flex-col lg:gap-16 max-lg:gap-6">
        <div className="w-full max-sm:h-[65px] sm:h-[100px] rounded-full flex justify-center items-center bg-custom-red-100">
          <h1 className="text-white max-sm:text-xl sm:text-3xl xl:text-4xl font-bold">
            Skontaktuj się z nami
          </h1>
        </div>
        <div className="w-full lg:h-[400px] xl:h-[500px] justify-between flex max-lg:gap-16 max-lg:flex-col ">
          <ContactUsContactDataPanel />
          <ContactUsHotlineDataPanel />
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;
