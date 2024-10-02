import React from "react";
import { motion } from "framer-motion";
import Spinner from "../universal/Spinner.jsx";
import useProductSizes from "../../hooks/queries/useProductSizes.js";

const ShopProductAdditionalInformationPanel = ({ productData, cardColor }) => {
  const { productSizes, fetchingProductSizes } = useProductSizes(
    productData.id,
    productData.productType,
  );

  const productType = productData.productType;

  if (productData?.productType === "CLOTHING" && fetchingProductSizes) {
    return <Spinner />;
  }
  console.log(productSizes);

  let additionalInformationData = [
    {
      infoTitle: "Waga:",
      infoContent: `${productData.weight} (kg)`,
    },
    {
      infoTitle: "Rozmiar paczki:",
      infoContent: `${productData.packageSize} (cm)`,
    },
  ];

  const getAdditionalInformationDataDependsOnProductType = () => {
    if (productType === "CLOTHING") {
      return [
        {
          infoTitle: "Kolor:",
          infoContent: productData.color,
        },
        {
          infoTitle: "Rozmiary:",
          infoContent: productSizes.join(", "),
        },
      ];
    }

    if (productType === "MUG") {
      return [
        {
          infoTitle: "Kolor:",
          infoContent: productData.color,
        },
        {
          infoTitle: "Materiał:",
          infoContent: productData.material,
        },
        {
          infoTitle: "Wysokość:",
          infoContent: `${productData.height} (cm)`,
        },
      ];
    }

    if (productType === "PEN") {
      return [
        {
          infoTitle: "Kolor:",
          infoContent: productData.color,
        },
        {
          infoTitle: "Kolor tuszu:",
          infoContent: productData.inkColor,
        },
      ];
    }

    if (productType === "GADGET") {
      return [
        {
          infoTitle: "Typ:",
          infoContent: productData.type,
        },
        {
          infoTitle: "Materiał:",
          infoContent: productData.material,
        },
      ];
    }
  };

  additionalInformationData = [
    ...additionalInformationData,
    ...getAdditionalInformationDataDependsOnProductType(),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.4 }}
      className={`w-full gap-2 flex p-8 flex-col items-center h-auto rounded-2xl ${cardColor}`}
    >
      <ul className="w-[35%] h-auto space-y-4">
        {additionalInformationData.map((data, index) => (
          <li className="w-full text-xl flex justify-between" key={index}>
            <p>{data.infoTitle}</p>
            <p>{data.infoContent}</p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ShopProductAdditionalInformationPanel;
