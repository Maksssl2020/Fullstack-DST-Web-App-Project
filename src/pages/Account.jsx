import React from "react";
import AccountAdminSection from "../components/section/AccountAdminSection";
import AnimatedPage from "../animation/AnimatedPage";
import AccountInformationSection from "../components/section/AccountInformationSection";

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
