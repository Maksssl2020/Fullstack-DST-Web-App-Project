import React from "react";

const TableColumnList = ({ listData }) => {
  return (
    <ul>
      {listData.map((item, i) => (
        <li
          className="max-md:text-[8px] max-lg:text-[10px] max-xl:text-xs xl:text-sm"
          key={i}
        >
          {item === "" ? <br /> : item}
        </li>
      ))}
    </ul>
  );
};

export default TableColumnList;
