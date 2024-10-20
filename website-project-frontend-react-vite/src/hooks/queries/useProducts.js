import { useQuery } from "react-query";
import { fetchAllProducts } from "../../helpers/api-integration/ShopProductsHandling.js";

function UseProducts(chosenCategory) {
  const { data: products, isLoading: fetchingProducts } = useQuery(
    ["productsData", chosenCategory],
    () => fetchAllProducts(chosenCategory),
    {
      keepAlive: true,
    },
  );

  return { products, fetchingProducts };
}

export default UseProducts;
