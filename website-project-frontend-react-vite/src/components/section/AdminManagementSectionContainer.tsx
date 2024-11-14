import React from "react";

const AdminManagementSectionContainer = ({ className, children }) => {
  return (
    <div
      className={`max-lg:w-[95%] lg:w-[950px] xl:w-[1150px] h-auto min-h-[640px] bg-custom-gray-100 rounded-2xl flex flex-col p-4 gap-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default AdminManagementSectionContainer;
