import React, { useState } from "react";
import ShopProductImagesPanel from "../panel/ShopProductImagesPanel.jsx";
import ShopProductBuyOptionsPanel from "../panel/ShopProductBuyOptionsPanel.jsx";
import ShopProductDescriptionPanel from "../panel/ShopProductDescriptionPanel.jsx";
import ShopProductAdditionalInformationPanel from "../panel/ShopProductAdditionalInformationPanel.jsx";
import SimilarProductsList from "../list/SimilarProductsList.jsx";
import Spinner from "../universal/Spinner.jsx";
import ButtonWithAnimatedBottomBorder from "../universal/ButtonWithAnimatedBottomBorder.jsx";
import useProduct from "../../hooks/queries/useProduct.js";
import useUserItemsMarkedAsFavouriteIds from "../../hooks/queries/useUserItemsMarkedAsFavouriteIds.js";

const ShopProductSection = ({ productId, cardColor }) => {
  const [chosenOption, setChosenOption] = useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [productCategories, setProductCategories] = React.useState([]);
  const { product, fetchingProduct } = useProduct(productId);
  const { userItemsMarkedAsFavourite, fetchingUserItemsMarkedAsFavourite } =
    useUserItemsMarkedAsFavouriteIds();

  const handleButtonClick = (index) => {
    setChosenOption(index);

    if (index === 1) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  if (fetchingProduct || fetchingUserItemsMarkedAsFavourite) {
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

  let markedProduct = userItemsMarkedAsFavourite?.filter(
    (item) => item.mainProductId === product.id,
  )[0];

  console.log(markedProduct);
  console.log(product);

  return (
    <div className="my-8 flex flex-col w-[1450px] h-auto bg-white rounded-2xl p-6">
      <div className="w-full h-auto justify-between flex">
        <ShopProductImagesPanel productId={productId} cardColor={cardColor} />
        <ShopProductBuyOptionsPanel
          productData={product}
          cardColor={cardColor}
          setProductCategories={setProductCategories}
          markedAsFavourite={markedProduct}
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
            productData={product}
            cardColor={cardColor}
          />
        ) : (
          <ShopProductAdditionalInformationPanel
            productData={product}
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
