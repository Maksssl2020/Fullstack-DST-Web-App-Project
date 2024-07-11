import React from "react";

const AccountInformationSection = () => {
  return (
    <div className="w-full flex bg-custom-gray-300 flex-col font-lato h-[850px]">
      <div className="ml-[15%] mt-8 w-[600px] text-white items-center flex text-2xl justify-center h-[75px] bg-custom-blue-200 rounded-full">
        {"Cześć, MILENA1234 witamy Cię serdecznie <3"}
      </div>
      <div className="flex w-full justify-center">
        <div className="w-[75%] mt-8 h-[650px] rounded-3xl bg-white"></div>
      </div>
    </div>
  );
};

export default AccountInformationSection;
