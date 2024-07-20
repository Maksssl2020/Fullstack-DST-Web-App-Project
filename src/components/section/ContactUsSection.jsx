import React from "react";
import ContactUsContactDataPanel from "../panel/ContactUsContactDataPanel";
import ContactUsHotlineDataPanel from "../panel/ContactUsHotlineDataPanel";

const ContactUsSection = () => {
  return (
    <div className="w-[1450px] h-[850px] p-12 mt-8 rounded-2xl bg-custom-pink-300">
      <div className="w-full h-full bg-white p-8 rounded-2xl">
        <div className="w-full h-[100px] rounded-full flex justify-center items-center bg-custom-red-100">
          <h1 className="text-white text-6xl font-bold">
            Skontaktuj się z nami
          </h1>
        </div>
        <div className="w-full justify-between flex h-[75%] p-6 mt-12">
          <ContactUsContactDataPanel />
          <ContactUsHotlineDataPanel />
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;
