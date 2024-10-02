import { useQuery } from "react-query";
import { fetchProductImages } from "../../helpers/api-integration/ShopProductsHandling.js";

function UseProductImages(productId) {
  const { data: productImages, isLoading: fetchingProductImages } = useQuery(
    [`productPageImages${productId}`, productId],
    () => fetchProductImages(productId),
  );

  return { productImages, fetchingProductImages };
}

export default UseProductImages;
