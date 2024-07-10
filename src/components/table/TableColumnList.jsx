import React from "react";

const TableColumnList = ({ listData }) => {
  return (
    <ul>
      {listData.map((item, i) => (
        <li key={i}>{item === "" ? <br /> : item}</li>
      ))}
    </ul>
  );
};

export default TableColumnList;
