import React from "react";
import { useQuery } from "react-query";
import { fetchProductSizes } from "../../helpers/api-integration/ShopProductsHandling.js";

function UseProductSizes(productId, productType) {
  const { data: productSizes, isLoading: fetchingProductSizes } = useQuery(
    ["productSizes", productId],
    () => {
      if (productType === "CLOTHING") {
        return fetchProductSizes(productId);
      }
    },
  );

  return { productSizes, fetchingProductSizes };
}

export default UseProductSizes;
