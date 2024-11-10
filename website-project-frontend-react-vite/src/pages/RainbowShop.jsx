import React, { useState } from "react";
import RainbowShopProductCard from "../components/card/RainbowShopProductCard.jsx";
import { getBackgroundColor } from "../helpers/DrawBackgroundColor.js";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import Spinner from "../components/universal/Spinner.jsx";
import useProducts from "../hooks/queries/useProducts.js";
import { motion } from "framer-motion";
import SearchIcon from "../icons/SearchIcon.jsx";

const RainbowShop = () => {
  const [chosenCategory, setChosenCategory] = useState("wszystko");
  const [searchBar, setSearchBar] = useState("");
  const { products, fetchingProducts } = useProducts(chosenCategory);

  if (fetchingProducts) {
    return <Spinner />;
  }

  const categoriesData = [
    { categoryName: "wszystko", categoryValue: "wszystko" },
    { categoryName: "bony upominkowe", categoryValue: "bony" },
    { categoryName: "akcesoria", categoryValue: "akcesoria" },
    { categoryName: "obrazy", categoryValue: "obrazy" },
    { categoryName: "ubrania", categoryValue: "ubrania" },
    { categoryName: "zestawy", categoryValue: "zestawy" },
    { categoryName: "certyfikat tęczy", categoryValue: "certyfikat" },
    { categoryName: "flagi", categoryValue: "flagi" },
  ];

  const handleCategoryChange = async (categoryValue) => {
    setChosenCategory(categoryValue);
  };

  return (
    <AnimatedPage>
      <div className="w-full font-lato gap-8 h-auto bg-custom-gray-300 flex items-center flex-col">
        <div className="w-[1250px] p-3 h-[125px] bg-white mt-16 rounded-full">
          <div className="w-full flex justify-center items-center h-full animated-rainbow-gradient rounded-full">
            <h1 className="text-6xl font-bold text-white ">Tęczowy Sklepik</h1>
          </div>
        </div>
        <div
          className={
            "w-[1500px] h-[150px] px-6 py-2 rounded-xl bg-custom-gray-100 flex flex-col items-center"
          }
        >
          <div className={"w-full h-[60px] flex justify-center items-center"}>
            <div className={"w-[50%] h-[50px] relative flex"}>
              <input
                placeholder={"Wyszukaj w sklepie..."}
                className={
                  "w-full h-full border-2 border-black rounded-xl placeholder:text-black px-4"
                }
                onChange={(e) => setSearchBar(e.target.value)}
              />
              <SearchIcon
                className={
                  "size-8 absolute right-0 mr-2 translate-y-[25%] stroke-2"
                }
              />
            </div>
          </div>
          <div className={"w-full mt-auto h-[40px] grid grid-cols-8"}>
            {categoriesData.map((data, index) => (
              <motion.button
                initial={{ color: "#000000" }}
                animate={
                  data.categoryValue === chosenCategory
                    ? { color: "#FF5A5A" }
                    : { color: "#000000" }
                }
                key={index}
                className={`flex justify-center uppercase font-medium`}
                value={data.categoryValue}
                onClick={(e) => handleCategoryChange(e.target.value)}
              >
                {data.categoryName}
              </motion.button>
            ))}
          </div>
        </div>
        <div className="w-[1500px] rounded-2xl h-auto">
          <ul className={"flex flex-wrap"}>
            {products
              ?.filter((product) => product.title.includes(searchBar))
              .map((cardData, index) => (
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
