import React, { useEffect, useState } from "react";
import ShopProductImagesPanel from "../panel/ShopProductImagesPanel";
import ShopProductBuyOptionsPanel from "../panel/ShopProductBuyOptionsPanel";
import ShopProductDescriptionPanel from "../panel/ShopProductDescriptionPanel";
import ShopProductAdditionalInformationPanel from "../panel/ShopProductAdditionalInformationPanel";
import axios from "../../helpers/AxiosConfig";
import SimilarProductsList from "../list/SimilarProductsList";

const ShopProductSection = ({ productId, cardColor }) => {
  const [chosenOption, setChosenOption] = useState(0);
  const [productData, setProductData] = useState({});
  const [isActive, setIsActive] = React.useState(false);
  const [productCategories, setProductCategories] = React.useState([]);

  const handleButtonClick = (index) => {
    setChosenOption(index);

    if (index === 1) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  useEffect(() => {
    try {
      axios.get(`/products/${productId}`).then((response) => {
        setProductData(response.data);
      });
      console.log(productData);
    } catch (error) {
      console.log(error);
    }
  }, [productId]);

  console.log(productData);

  return (
    <div className="my-8 flex flex-col w-[1450px] h-auto bg-white rounded-2xl p-6">
      <div className="w-full h-auto justify-between flex">
        <ShopProductImagesPanel productId={productId} cardColor={cardColor} />
        <ShopProductBuyOptionsPanel
          productData={productData}
          cardColor={cardColor}
          setProductCategories={setProductCategories}
        />
      </div>
      <div className="w-full flex justify-center gap-6 items-center h-[75px] bg-white">
        <button
          className={`uppercase text-xl border-b-4 ${chosenOption === 0 ? "border-red-500 font-bold" : "border-white"}`}
          onClick={() => handleButtonClick(0)}
        >
          opis
        </button>
        <button
          className={`uppercase text-xl w-fit h-auto border-b-4 ${chosenOption === 1 ? "border-red-500 font-bold" : "border-white"}`}
          onClick={() => handleButtonClick(1)}
        >
          informacje dodatkowe
        </button>
      </div>
      <div className="transition-transform duration-300 ease-in-out">
        {chosenOption === 0 ? (
          <ShopProductDescriptionPanel
            productData={productData}
            cardColor={cardColor}
          />
        ) : (
          <ShopProductAdditionalInformationPanel
            productData={productData}
            isActive={isActive}
            cardColor={cardColor}
          />
        )}
      </div>
      <div className="w-full flex gap-8 flex-col items-center my-6 h-auto">
        <SimilarProductsList
          productCategories={productCategories}
          productId={productId}
        />
      </div>
    </div>
  );
};

export default ShopProductSection;
