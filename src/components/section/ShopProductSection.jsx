import React, { useState } from "react";
import ShopProductImagesPanel from "../panel/ShopProductImagesPanel";
import ShopProductBuyOptionsPanel from "../panel/ShopProductBuyOptionsPanel";
import ShopProductDescriptionPanel from "../panel/ShopProductDescriptionPanel";
import ShopProductAdditionalInformationPanel from "../panel/ShopProductAdditionalInformationPanel";
import RainbowShopProductCard from "../card/RainbowShopProductCard";
import { getBackgroundColor } from "../../helpers/DrawBackgroundColor";
import { rainbowShopData } from "../../data/RainbowShopData";

const ShopProductSection = ({ productTitle }) => {
  const [chosenOption, setChosenOption] = useState(0);

  const handleButtonClick = (index) => {
    setChosenOption(index);
  };

  return (
    <div className="my-8 flex flex-col w-[1450px] h-auto bg-white rounded-2xl p-6">
      <div className="w-full h-auto justify-between flex">
        <ShopProductImagesPanel />
        <ShopProductBuyOptionsPanel productTitle={productTitle} />
      </div>
      <div className="w-full flex justify-center gap-6 items-center h-[75px] bg-white">
        <button
          className={`uppercase text-xl font-bold border-b-4 ${chosenOption === 0 ? "border-red-500" : "border-white"}`}
          onClick={() => handleButtonClick(0)}
        >
          opis
        </button>
        <button
          className={`uppercase text-xl w-fit h-auto border-b-4 ${chosenOption === 1 ? "border-red-500" : "border-white"}`}
          onClick={() => handleButtonClick(1)}
        >
          informacje dodatkowe
        </button>
      </div>
      <div className="transition-transform duration-300 ease-in-out">
        {chosenOption === 0 ? (
          <ShopProductDescriptionPanel />
        ) : (
          <ShopProductAdditionalInformationPanel />
        )}
      </div>
      <div className="w-full flex gap-8 flex-col items-center my-6 h-auto">
        <h2 className="text-5xl font-bold">Podobne artykuły</h2>
        <ul className="w-full flex h-auto">
          {rainbowShopData.slice(0, 4).map((item, index) => (
            <li key={index}>
              <RainbowShopProductCard
                title={item}
                image="/assets/images/Test_T_Shirt_Photo.png"
                cardColor={getBackgroundColor(index)}
                size={"size-auto"}
                price={"135,00"}
                cardType={"LIST"}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShopProductSection;
