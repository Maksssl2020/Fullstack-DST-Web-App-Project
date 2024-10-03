import { useMutation, useQueryClient } from "react-query";
import { deleteAllProductsFromCart } from "../../helpers/api-integration/ShoppingCartHandling.js";
import toast from "react-hot-toast";

function UseDeleteAllItemsFromCartMutation(cartId) {
  const queryClient = useQueryClient();

  const {
    mutate: deleteAllItemsFromCart,
    isLoading: deletingAllItemsFromCart,
  } = useMutation({
    mutationKey: ["deleteAllItemsFromCart"],
    mutationFn: () => deleteAllProductsFromCart(cartId),
    onSuccess: () => {
      toast.success("Usunięto wszystkie produkty z koszyka!");
      queryClient.invalidateQueries([`cartItems${cartId}`]);
      queryClient.invalidateQueries([`amountOfCartItems${cartId}`]);
    },
  });

  return { deleteAllItemsFromCart, deletingAllItemsFromCart };
}

export default UseDeleteAllItemsFromCartMutation;
