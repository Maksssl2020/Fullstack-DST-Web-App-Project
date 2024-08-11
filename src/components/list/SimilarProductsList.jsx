import React from "react";
import { useQuery } from "react-query";
import RainbowShopProductCard from "../card/RainbowShopProductCard";
import { getBackgroundColor } from "../../helpers/DrawBackgroundColor";
import { motion } from "framer-motion";
import Spinner from "../universal/Spinner";
import {
  fetchAllProductsCategories,
  fetchSimilarProducts,
} from "../../helpers/api-integration/ShopProductsHandling";

const SimilarProductsList = ({ productCategories, productId }) => {
  const { data: productsCategoriesData, isLoading: categoriesLoading } =
    useQuery(["productCategories"], () => fetchAllProductsCategories());
  const { data: similarProductsList, isLoading: productsLoading } = useQuery(
    ["similarProductsList", productCategories, productsCategoriesData],
    () =>
      fetchSimilarProducts(
        productCategories,
        productsCategoriesData,
        productId,
      ),
  );

  if (categoriesLoading || productsLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h2 className="text-5xl font-bold">Podobne artykuły</h2>
      <ul className="w-full flex h-auto">
        {similarProductsList.map((data, index) => (
          <motion.li whileHover={{ y: -15 }} key={index}>
            <RainbowShopProductCard
              cardData={data}
              cardColor={getBackgroundColor(index)}
              cardType="LIST"
              size={"size-auto"}
            />
          </motion.li>
        ))}
      </ul>
    </>
  );
};

export default SimilarProductsList;
