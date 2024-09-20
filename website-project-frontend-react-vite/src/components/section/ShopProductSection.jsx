import React, { useState } from "react";
import ShopProductImagesPanel from "../panel/ShopProductImagesPanel.jsx";
import ShopProductBuyOptionsPanel from "../panel/ShopProductBuyOptionsPanel.jsx";
import ShopProductDescriptionPanel from "../panel/ShopProductDescriptionPanel.jsx";
import ShopProductAdditionalInformationPanel from "../panel/ShopProductAdditionalInformationPanel.jsx";
import SimilarProductsList from "../list/SimilarProductsList.jsx";
import { useQuery } from "react-query";
import { fetchProductData } from "../../helpers/api-integration/ShopProductsHandling.js";
import Spinner from "../universal/Spinner.jsx";
import ButtonWithAnimatedBottomBorder from "../universal/ButtonWithAnimatedBottomBorder.jsx";

const ShopProductSection = ({ productId, cardColor }) => {
  const [chosenOption, setChosenOption] = useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [productCategories, setProductCategories] = React.useState([]);

  const { data: productData, isLoading: fetchingProductData } = useQuery(
    ["productPageData", productId],
    () => fetchProductData(productId),
  );

  const handleButtonClick = (index) => {
    setChosenOption(index);

    if (index === 1) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  if (fetchingProductData) {
    return <Spinner />;
  }

  const tabsData = [
    {
      name: "opis",
      onClick: () => handleButtonClick(0),
    },
    {
      name: "informacje dodatkowe",
      onClick: () => handleButtonClick(1),
    },
  ];

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
      <div className="w-full flex justify-center gap-4 items-center h-[75px] bg-white relative">
        {tabsData.map((data, index) => (
          <ButtonWithAnimatedBottomBorder
            key={index}
            name={data.name}
            isSelected={index === chosenOption}
            onClick={data.onClick}
          />
        ))}
      </div>
      <div>
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
