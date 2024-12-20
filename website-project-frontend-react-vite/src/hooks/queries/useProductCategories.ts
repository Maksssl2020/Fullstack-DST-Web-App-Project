import { useQuery } from "react-query";
import { fetchProductCategoriesData } from "../../helpers/api-calls/ShopProductsHandling.js";

function UseProductCategories(productId) {
  const { data: productCategories, isLoading: fetchingProductCategories } =
    useQuery(["productCategories", productId], () =>
      fetchProductCategoriesData(productId),
    );

  return { productCategories, fetchingProductCategories };
}

export default UseProductCategories;
