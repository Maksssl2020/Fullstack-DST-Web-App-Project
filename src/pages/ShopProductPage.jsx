import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { transformLinkTitleIntoProductTitle } from "../helpers/transformProductTitle";
import HeartIcon from "../icons/HeartIcon";
import DashedLine from "../components/universal/DashedLine";
import ShopProductSection from "../components/section/ShopProductSection";

const ShopProductPage = () => {
  const { title } = useParams();
  const productTitle = transformLinkTitleIntoProductTitle(title);

  return (
    <div className="w-full bg-custom-gray-400 h-auto flex justify-center font-lato">
      <ShopProductSection productTitle={productTitle} />
    </div>
  );
};

export default ShopProductPage;
