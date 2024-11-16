import { useMutation, useQueryClient } from "react-query";
import { deleteProductFromCart } from "../../helpers/api-calls/ShoppingCartHandling.js";
import toast from "react-hot-toast";

function UseDeleteItemFromCartMutation(cartIdentifier) {
  const queryClient = useQueryClient();

  const { mutate: deleteItemFromCart, isLoading: deletingItemFromCart } =
    useMutation({
      mutationKey: ["deleteItemFromCart"],
      mutationFn: ({ cartItemId, cartId }) =>
        deleteProductFromCart(cartItemId, cartId),
      onMutate: async (cartItemId) => {
        await queryClient.cancelQueries(["cartItems", cartIdentifier]);
        const previousItems = queryClient.getQueryData([
          "cartItems",
          cartIdentifier,
        ]);

        queryClient.setQueryData(["cartItems", cartIdentifier], (old = []) => {
          return old.filter((item) => item.id !== cartItemId);
        });

        return { previousItems };
      },
      onError: (error, variables, context) => {
        queryClient.setQueryData(
          ["cartItems", cartIdentifier],
          context.previousItems,
        );
      },
      onSuccess: () => {
        toast.success("Przedmiot został usunięty z koszyka!");
      },
      onSettled: () => {
        queryClient.invalidateQueries(["cartItems", cartIdentifier]);
        queryClient.invalidateQueries(["amountOfCartItems", cartIdentifier]);
        queryClient.invalidateQueries(["userCartData", cartIdentifier]);
      },
    });

  return { deleteItemFromCart, deletingItemFromCart };
}

export default UseDeleteItemFromCartMutation;
