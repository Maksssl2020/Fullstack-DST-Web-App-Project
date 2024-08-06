import React from "react";
import axios from "../../helpers/AxiosConfig";
import { useQuery } from "react-query";
import RainbowShopProductCard from "../card/RainbowShopProductCard";
import { getBackgroundColor } from "../../helpers/DrawBackgroundColor";

const fetchProductsCategories = async () => {
  try {
    const response = await axios.get("/products/categories");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const fetchProductData = async (id) => {
  try {
    const response = await axios.get(`products/cards/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getSimilarProductsList = async (
  productCategory,
  productsCategoriesData,
  productId,
) => {
  const filteredProducts = productsCategoriesData.filter((item) => {
    return (
      productId.toString() !== item.productId.toString() &&
      productCategory.includes(item.category)
    );
  });

  console.log(filteredProducts);
  console.log(productsCategoriesData);

  const productIds =
    filteredProducts.length > 4
      ? filteredProducts.slice(0, 4).map((item) => item.productId)
      : filteredProducts.map((item) => item.productId);

  return await Promise.all(productIds.map((id) => fetchProductData(id)));
};

const SimilarProductsList = ({ productCategories, productId }) => {
  const { data: productsCategoriesData, isLoading: categoriesLoading } =
    useQuery(["productCategories"], () => fetchProductsCategories());
  const { data: similarProductsList, isLoading: productsLoading } = useQuery(
    ["similarProductsList", productCategories, productsCategoriesData],
    () =>
      getSimilarProductsList(
        productCategories,
        productsCategoriesData,
        productId,
      ),
  );

  if (categoriesLoading || productsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="text-5xl font-bold">Podobne artykuły</h2>
      <ul className="w-full flex h-auto">
        {similarProductsList.map((data, index) => (
          <li key={index}>
            <RainbowShopProductCard
              cardData={data}
              cardColor={getBackgroundColor(index)}
              cardType="LIST"
              size={"size-auto"}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default SimilarProductsList;
