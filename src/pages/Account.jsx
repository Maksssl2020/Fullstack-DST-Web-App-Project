import React from "react";
import AnimatedPage from "../animation/AnimatedPage";
import AccountInformationSection from "../components/section/account/AccountInformationSection";

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
