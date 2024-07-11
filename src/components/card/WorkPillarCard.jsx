import React from "react";

const WorkPillarCard = ({ title, cardData }) => {
  return (
    <div className="h-[500px] relative w-[350px] py-2 px-4 flex flex-col items-center rounded-xl border-[8px] border-custom-pink-200">
      <h1 className="font-bold z-10">{title}</h1>
      <div className="text-xl mt-4 justify-center">
        {cardData[0] !== undefined &&
          cardData.map((data, index) =>
            data.color === "default" ? (
              <span key={index}>{data.text}</span>
            ) : (
              <span key={index} className="text-custom-pink-200 italic">
                {data.text}
              </span>
            ),
          )}
      </div>
    </div>
  );
};

export default WorkPillarCard;
