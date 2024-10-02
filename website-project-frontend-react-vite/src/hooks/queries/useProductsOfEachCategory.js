import { useQuery } from "react-query";
import { fetchProductsOfEachCategory } from "../../helpers/api-integration/ShopProductsHandling.js";

function useProductsOfEachCategory() {
  const {
    data: productsOfEachCategory,
    isLoading: fetchingProductsOfEachCategory,
  } = useQuery(["productsOfEachCategory"], () => fetchProductsOfEachCategory());

  return { productsOfEachCategory, fetchingProductsOfEachCategory };
}

export default useProductsOfEachCategory;
