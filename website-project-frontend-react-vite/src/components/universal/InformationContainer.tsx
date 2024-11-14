import React from "react";

const InformationContainer = ({ label, value }) => {
  return (
    <div className="w-[350px] h-[85px] bg-white rounded-2xl border-4 border-black p-2 flex flex-col justify-between">
      <label className="text-xl">{label}:</label>
      <p className="font-bold text-2xl">{value}</p>
    </div>
  );
};

export default InformationContainer;
