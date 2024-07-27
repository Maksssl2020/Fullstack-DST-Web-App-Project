import React from "react";
import ContactUsSection from "../components/section/ContactUsSection";
import AnimatedPage from "../animation/AnimatedPage";

const ContactUs = () => {
  return (
    <AnimatedPage>
      <div className="w-full flex justify-center h-auto font-lato">
        <ContactUsSection />
      </div>
    </AnimatedPage>
  );
};

export default ContactUs;
