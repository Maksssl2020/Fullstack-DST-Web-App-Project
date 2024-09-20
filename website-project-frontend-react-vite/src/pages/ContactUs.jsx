import React from "react";
import ContactUsSection from "../components/section/ContactUsSection.jsx";
import AnimatedPage from "../animation/AnimatedPage.jsx";

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
