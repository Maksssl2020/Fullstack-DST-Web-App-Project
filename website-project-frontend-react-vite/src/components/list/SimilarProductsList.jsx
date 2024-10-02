import React from "react";
import RainbowShopProductCard from "../card/RainbowShopProductCard.jsx";
import { getBackgroundColor } from "../../helpers/DrawBackgroundColor.js";
import { motion } from "framer-motion";
import Spinner from "../universal/Spinner.jsx";
import useSimilarProducts from "../../hooks/queries/useSimilarProducts.js";

const SimilarProductsList = ({ productCategories, productId }) => {
  const { similarProducts, fetchingSimilarProducts } = useSimilarProducts(
    productCategories,
    productId,
  );

  if (fetchingSimilarProducts) {
    return <Spinner />;
  }

  return (
    <>
      {similarProducts.length > 0 && (
        <>
          <h2 className="text-5xl font-bold">Podobne artykuły</h2>
          <ul className="w-full flex h-auto">
            {similarProducts.map((data, index) => (
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
      )}
    </>
  );
};

export default SimilarProductsList;
