import { useMutation, useQueryClient } from "react-query";
import { handleDeleteProduct } from "../../helpers/api-calls/ShopProductsHandling.js";

function UseDeleteProductMutation(onSuccessCallback) {
  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isLoading: deletingProduct } = useMutation({
    mutationKey: ["deleteProductById"],
    mutationFn: (productId) => handleDeleteProduct(productId),
    onMutate: async (productId) => {
      await queryClient.cancelQueries(["productsData"]);
      const previousProducts = queryClient.getQueriesData(["productsData"]);

      queryClient.setQueriesData(["productsData"], (old) => {
        return old.filter((product) => product.id !== productId);
      });

      return { previousProducts };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["productsData"], context.previousProducts);
      console.log(error);
    },
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["productsData"]);
    },
  });

  return { deleteProduct, deletingProduct };
}

export default UseDeleteProductMutation;
