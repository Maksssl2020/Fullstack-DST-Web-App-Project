import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { transformLinkTitleIntoProductTitle } from "../helpers/transformProductTitle";
import HeartIcon from "../icons/HeartIcon";
import DashedLine from "../components/universal/DashedLine";
import ShopProductSection from "../components/section/ShopProductSection";
import AnimatedPage from "../animation/AnimatedPage";

const ShopProductPage = () => {
  const { title } = useParams();
  const productTitle = transformLinkTitleIntoProductTitle(title);

  console.log(title);
  return (
    <AnimatedPage>
      <div className="w-full bg-custom-gray-400 h-auto flex justify-center font-lato">
        <ShopProductSection productTitle={productTitle} />
      </div>
    </AnimatedPage>
  );
};

export default ShopProductPage;
