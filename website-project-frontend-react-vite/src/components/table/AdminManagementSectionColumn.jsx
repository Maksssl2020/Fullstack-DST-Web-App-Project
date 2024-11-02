import React from "react";

const AdminManagementSectionColumn = ({ name, value, className }) => {
  return (
    <label
      className={`flex flex-col items-center h-full justify-between ${className}`}
    >
      <p>{name}</p>
      <p className="font-bold">{value}</p>
    </label>
  );
};

export default AdminManagementSectionColumn;
