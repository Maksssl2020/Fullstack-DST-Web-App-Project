import React from "react";

const RainbowShopProductCard = ({ title, cardColor, image }) => {
  return (
    <div
      className={"w-[500px] flex flex-col justify-center items-center h-[500px]".concat(
        " " + cardColor,
      )}
    >
      <div className="w-[350px] h-[350px]">
        <img
          className="inset-0 object-cover w-full h-full"
          src={image}
          alt={title}
        />
      </div>
      <div className="w-[75%] text-3xl flex justify-center items-center bg-white h-[50px] rounded-full italic">
        {title}
      </div>
    </div>
  );
};

export default RainbowShopProductCard;
