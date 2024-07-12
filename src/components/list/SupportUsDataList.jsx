import React from "react";

const SupportUsDataList = ({
  listData,
  styling = " marker:text-custom-orange-200 text-center",
}) => {
  return (
    <ul className="list-disc space-y-4 mt-2 text-2xl">
      {listData.map((data, index) => (
        <li className={styling} key={index}>
          <span className="font-bold">
            {data.keyWord !== undefined ? data.keyWord : ""}
          </span>
          {data.description !== undefined ? data.description : data}
        </li>
      ))}
    </ul>
  );
};

export default SupportUsDataList;
