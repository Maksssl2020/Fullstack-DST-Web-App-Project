import React from "react";

const UserAccountInformationSection = ({ children }) => {
  return (
    <div className={"flex h-full w-full flex-col"}>
      <div className="flex h-[100px] w-full items-center justify-center rounded-2xl bg-custom-orange-100 text-5xl font-bold italic text-white">
        Informacje o koncie
      </div>
      {children}
    </div>
  );
};

export default UserAccountInformationSection;
