import React from "react";
import AccountInformationSection from "../components/section/AccountInformationSection";
import AnimatedPage from "../animation/AnimatedPage";

const Account = () => {
  return (
    <AnimatedPage>
      <div className="w-full h-full">
        <AccountInformationSection />
      </div>
    </AnimatedPage>
  );
};

export default Account;
