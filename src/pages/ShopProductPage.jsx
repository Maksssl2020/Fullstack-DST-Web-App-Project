import React from "react";
import { useParams } from "react-router-dom";
import { transformLinkTitleIntoProductTitle } from "../helpers/transformProductTitle";
import ShopProductSection from "../components/section/ShopProductSection";
import AnimatedPage from "../animation/AnimatedPage";

const ShopProductPage = () => {
  const { id, title } = useParams();
  const productTitle = transformLinkTitleIntoProductTitle(title);

  console.log(title);
  return (
    <AnimatedPage>
      <div className="w-full bg-custom-gray-400 h-auto flex justify-center font-lato">
        <ShopProductSection productId={id} productTitle={productTitle} />
      </div>
    </AnimatedPage>
  );
};

export default ShopProductPage;
