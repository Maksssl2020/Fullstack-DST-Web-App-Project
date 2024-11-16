import { useMutation, useQueryClient } from "react-query";
import { deleteAllProductsFromCart } from "../../helpers/api-calls/ShoppingCartHandling.js";
import toast from "react-hot-toast";

function UseDeleteAllItemsFromCartMutation(cartId, cartIdentifier) {
  const queryClient = useQueryClient();

  const {
    mutate: deleteAllItemsFromCart,
    isLoading: deletingAllItemsFromCart,
  } = useMutation({
    mutationKey: ["deleteAllItemsFromCart"],
    mutationFn: () => deleteAllProductsFromCart(cartId),
    onSuccess: () => {
      toast.success("Usunięto wszystkie produkty z koszyka!");
      queryClient.invalidateQueries(["cartItems", cartIdentifier]);
      queryClient.invalidateQueries(["amountOfCartItems", cartIdentifier]);
    },
  });

  return { deleteAllItemsFromCart, deletingAllItemsFromCart };
}

export default UseDeleteAllItemsFromCartMutation;
