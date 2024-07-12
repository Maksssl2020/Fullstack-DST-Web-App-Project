import React from "react";

const SupportUsSectionHeader = ({ title, children }) => {
  return (
    <div className="text-center mt-4">
      <h2 className="font-bold text-4xl">{title}</h2>
      {children && <div className="text-2xl mt-2">{children}</div>}
    </div>
  );
};

export default SupportUsSectionHeader;
