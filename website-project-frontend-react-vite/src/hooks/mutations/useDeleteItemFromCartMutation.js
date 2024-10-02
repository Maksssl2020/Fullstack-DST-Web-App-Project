import { useMutation, useQueryClient } from "react-query";
import { deleteProductFromCart } from "../../helpers/api-integration/ShoppingCartHandling.js";
import toast from "react-hot-toast";

function UseDeleteItemFromCartMutation(cartItemId, cartId) {
  const queryClient = useQueryClient();

  const { mutate: deleteItemFromCart, isLoading: deletingItemFromCart } =
    useMutation({
      mutationKey: ["deleteItemFromCart", cartItemId],
      mutationFn: () => deleteProductFromCart(cartItemId),
      onMutate: async () => {
        await queryClient.cancelQueries([`cartItems${cartId}`]);
        const previousItems = queryClient.getQueriesData([
          `cartItems${cartId}`,
        ]);

        queryClient.setQueriesData([`cartItems${cartId}`], (old = []) => {
          return old.filter((item) => item.id !== cartItemId);
        });

        return { previousItems };
      },
      onError: (error, variables, context) => {
        queryClient.setQueriesData(
          [`cartItems${cartId}`],
          context.previousItems,
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries([`cartItems${cartId}`]);
        queryClient.invalidateQueries([`amountOfCartItems${cartId}`]);
      },
      onSuccess: () => {
        toast.success("Przedmiot został usunięty z koszyka!");
      },
    });

  return { deleteItemFromCart, deletingItemFromCart };
}

export default UseDeleteItemFromCartMutation;
