import React from "react";
import { useMutation } from "react-query";
import { fetchProductData } from "../../helpers/api-calls/ShopProductsHandling.js";

function UseProductMutation(onSuccessCallback) {
  const {
    mutate: fetchProductDataToUpdate,
    isLoading: fetchingProductDataToUpdate,
  } = useMutation(
    ["productDataToEdit"],
    (productId) => fetchProductData(productId),
    {
      onSuccess: (productData) => {
        if (onSuccessCallback) {
          onSuccessCallback(productData);
        }
      },
    },
  );

  return { fetchProductDataToUpdate, fetchingProductDataToUpdate };
}

export default UseProductMutation;
