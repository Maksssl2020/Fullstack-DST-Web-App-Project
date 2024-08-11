import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { transformProductTitleIntoLinkTitle } from "../../helpers/transformProductTitle";
import axios from "../../helpers/AxiosConfig";
import { useQuery } from "react-query";
import { fetchProductImages } from "../../helpers/api-integration/ShopProductsHandling";
import Spinner from "../universal/Spinner";

const RainbowShopProductCard = ({
  cardData,
  cardColor,
  cardType = "MAIN",
  size = "size-[500px]",
}) => {
  const navigate = useNavigate();
  const { id, title, price } = cardData;

  const { data: productImages, isLoading: fetchingProductImages } = useQuery(
    ["mainCardProductImages", id],
    () => fetchProductImages(id),
  );

  if (fetchingProductImages) {
    return <Spinner />;
  }

  return (
    <div className="w-auto h-auto">
      <div
        onClick={() =>
          navigate(
            `/rainbow-shop/products/${id}/${transformProductTitleIntoLinkTitle(title)}`,
            { state: { cardColor } },
          )
        }
        className={`flex flex-col justify-center items-center hover:cursor-pointer ${size}`.concat(
          " " + cardColor,
        )}
      >
        <div className="size-[350px] flex justify-center items-center">
          <img
            className="inset-0 object-cover size-[85%]"
            src={`data:image/png;base64,${productImages[0]}`}
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
