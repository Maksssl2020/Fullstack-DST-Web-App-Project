import { useQuery } from "react-query";
import { fetchAllProducts } from "../../helpers/api-integration/ShopProductsHandling.js";

function UseProducts() {
  const { data: products, isLoading: fetchingProducts } = useQuery(
    ["productsData"],
    () => fetchAllProducts(),
  );

  return { products, fetchingProducts };
}

export default UseProducts;
