import { useMutation, useQueryClient } from "react-query";
import { handleAddNewProduct } from "../../helpers/api-integration/ShopProductsHandling.js";

function UseAddProductMutation(onSuccessCallback) {
  const queryClient = useQueryClient();

  const { mutate: addProduct, isLoading: addingProduct } = useMutation({
    mutationKey: ["addNewProduct"],
    mutationFn: ({ productData, productType }) =>
      handleAddNewProduct(productData, productType),
    onSuccess: () => {
      queryClient.invalidateQueries("shopProductsData");
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { addProduct, addingProduct };
}

export default UseAddProductMutation;
