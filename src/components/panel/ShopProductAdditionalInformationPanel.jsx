import React from "react";
import axios from "../../helpers/AxiosConfig";
import { useQuery } from "react-query";

const fetchData = async (productId) => {
  try {
    const { data } = await axios.get(`/products/sizes/${productId}`);
    return data.flatMap((productSize) => productSize.size);
  } catch (error) {
    console.log(error);
  }
};

const ShopProductAdditionalInformationPanel = ({ productData, cardColor }) => {
  const {
    data: productSizes,
    error: sizesError,
    isLoading: sizesLoading,
  } = useQuery(
    ["productSizes", productData.id],
    () => fetchData(productData.id),
    {
      enabled: productData?.productType === "CLOTHING",
    },
  );
  const productType = productData.productType;

  if (productData?.productType === "CLOTHING" && sizesLoading) {
    return <div>Loading...</div>;
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
    <div
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
    </div>
  );
};

export default ShopProductAdditionalInformationPanel;
