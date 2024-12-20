import { useQuery } from "react-query";
import { fetchProductData } from "../../helpers/api-calls/ShopProductsHandling.js";

function UseProduct(productId) {
  const { data: product, isLoading: fetchingProduct } = useQuery(
    ["productPage", productId],
    () => fetchProductData(productId),
  );

  return { product, fetchingProduct };
}

export default UseProduct;
