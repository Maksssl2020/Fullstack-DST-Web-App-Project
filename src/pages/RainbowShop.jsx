import React, { useEffect } from "react";
import RainbowShopProductCard from "../components/card/RainbowShopProductCard";
import { getBackgroundColor } from "../helpers/DrawBackgroundColor";
import AnimatedPage from "../animation/AnimatedPage";
import axios from "../helpers/AxiosConfig";

const RainbowShop = () => {
  const [productsData, setProductsData] = React.useState([]);

  useEffect(() => {
    try {
      axios.get("/products").then((response) => {
        setProductsData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <AnimatedPage>
      <div className="w-full font-lato gap-8 h-auto bg-custom-gray-300 flex items-center flex-col">
        <div className="w-[1250px] p-3 h-[125px] bg-white mt-16 rounded-full">
          <div className="w-full flex justify-center items-center h-full static-rainbow-gradient rounded-full">
            <h1 className="text-6xl font-bold text-white ">Tęczowy Sklepik</h1>
          </div>
        </div>
        <div className="w-[1500px] rounded-2xl h-auto flex flex-wrap">
          {productsData.map((cardData, index) => (
            <RainbowShopProductCard
              key={index}
              cardData={cardData}
              cardColor={getBackgroundColor(index)}
            />
          ))}

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
