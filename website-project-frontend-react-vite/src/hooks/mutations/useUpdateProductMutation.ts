import { useMutation, useQueryClient } from "react-query";
import { handleUpdateProduct } from "../../helpers/api-calls/ShopProductsHandling.js";

function UseUpdateProductMutation(onSuccessCallback) {
  const queryClient = useQueryClient();

  const { mutate: updateProduct, isLoading: updatingProduct } = useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: ({ productId, productData, productType }) =>
      handleUpdateProduct(productId, productData, productType),
    onMutate: async ({ productId, productData }) => {
      await queryClient.cancelQueries(["productsData"]);
      const previousProductsData = queryClient.getQueryData(["productsData"]);

      queryClient.setQueryData(["productsData"], (old = []) => {
        old.map((product) => {
          if (product.id === productId) {
            return { ...product, ...productData };
          }
        });
      });

      return { previousProductsData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["productsData"], context.previousProductsData);
      console.log(error);
    },
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries("productsData");
    },
  });

  return { updateProduct, updatingProduct };
}

export default UseUpdateProductMutation;
