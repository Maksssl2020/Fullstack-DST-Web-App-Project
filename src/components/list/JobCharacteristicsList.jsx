import React from "react";

const JobCharacteristicsList = ({ listData }) => {
  return (
    <ul className="list-disc space-y-4 mt-2 text-2xl">
      {listData.map((data, index) => (
        <li className="marker:text-custom-orange-200 text-center" key={index}>
          <span className="font-bold">{data.keyWord}</span> {data.description}
        </li>
      ))}
    </ul>
  );
};

export default JobCharacteristicsList;
