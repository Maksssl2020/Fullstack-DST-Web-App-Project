import React from "react";
import { useNavigate } from "react-router-dom";
import { transformProductTitleIntoLinkTitle } from "../../helpers/transformProductTitle";

const RainbowShopProductCard = ({
  title,
  cardColor,
  image,
  cardType = "MAIN",
  size = "size-[500px]",
  price = "0,0",
}) => {
  const navigate = useNavigate();
  return (
    <div className="w-auto h-auto">
      <div
        onClick={() =>
          navigate(
            `/rainbow-shop/product/${transformProductTitleIntoLinkTitle(title)}`,
          )
        }
        className={`flex flex-col justify-center items-center hover:cursor-pointer ${size}`.concat(
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
        {cardType === "MAIN" && (
          <div className="w-[75%] text-3xl flex justify-center items-center bg-white h-[50px] rounded-full italic">
            {title}
          </div>
        )}
      </div>
      {cardType !== "MAIN" && (
        <div className="w-full h-auto text-3xl flex mt-2 flex-col items-center">
          <p className="italic">{title}</p>
          <p className="font-light">{price}</p>
        </div>
      )}
    </div>
  );
};

export default RainbowShopProductCard;
