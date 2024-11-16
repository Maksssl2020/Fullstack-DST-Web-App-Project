import { useQuery } from "react-query";
import { fetchSimilarProducts } from "../../helpers/api-calls/ShopProductsHandling.js";
import useProductsOfEachCategory from "./useProductsOfEachCategory.js";

function UseSimilarProducts(chosenProductCategories, chosenProductId) {
  const { productsOfEachCategory } = useProductsOfEachCategory();

  const { data: similarProducts, isLoading: fetchingSimilarProducts } =
    useQuery(["similarProducts", chosenProductId], () =>
      fetchSimilarProducts(
        productsOfEachCategory,
        chosenProductCategories,
        chosenProductId,
      ),
    );

  return { similarProducts, fetchingSimilarProducts };
}

export default UseSimilarProducts;
