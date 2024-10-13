import React from "react";
import RainbowShopProductCard from "../components/card/RainbowShopProductCard.jsx";
import { getBackgroundColor } from "../helpers/DrawBackgroundColor.js";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import { AnimatePresence } from "framer-motion";
import Spinner from "../components/universal/Spinner.jsx";
import useProducts from "../hooks/queries/useProducts.js";

const RainbowShop = () => {
  const { products, fetchingProducts } = useProducts();

  if (fetchingProducts) {
    return <Spinner />;
  }

  return (
    <AnimatedPage>
      <div className="w-full font-lato gap-8 h-auto bg-custom-gray-300 flex items-center flex-col">
        <div className="w-[1250px] p-3 h-[125px] bg-white mt-16 rounded-full">
          <div className="w-full flex justify-center items-center h-full animated-rainbow-gradient rounded-full">
            <h1 className="text-6xl font-bold text-white ">Tęczowy Sklepik</h1>
          </div>
        </div>
        <div className="w-[1500px] rounded-2xl h-auto">
          <ul className={"flex flex-wrap"}>
            {products?.map((cardData, index) => (
              <li key={cardData.id}>
                <RainbowShopProductCard
                  cardData={cardData}
                  cardColor={getBackgroundColor(index)}
                />
              </li>
            ))}
          </ul>

          <div className="w-full flex justify-center h-auto">
            <div className="w-[80%] flex justify-center items-center h-[200px] rounded-2xl my-16 bg-white">
              <p className="font-bold text-5xl">
                Życzmy udanych zakupów w naszym sklepie!
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default RainbowShop;
