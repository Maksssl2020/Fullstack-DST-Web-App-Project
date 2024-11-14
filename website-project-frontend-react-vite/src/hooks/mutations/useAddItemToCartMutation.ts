import { useMutation, useQueryClient } from "react-query";
import { addProductToCart } from "../../helpers/api-integration/ShoppingCartHandling.js";
import toast from "react-hot-toast";
import useAuthentication from "../others/useAuthentication.js";

function UseAddItemToCartMutation(cartIdentifier, itemData) {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthentication();
  const { id, quantity, chosenSize } = itemData;

  const { mutate: addItemToCart, isLoading: addingItemToCart } = useMutation({
    mutationKey: [
      "addProductToCart",
      cartIdentifier,
      id,
      quantity,
      chosenSize,
      isAuthenticated,
    ],
    mutationFn: () =>
      addProductToCart(
        cartIdentifier,
        id,
        quantity,
        chosenSize,
        isAuthenticated,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItems", cartIdentifier]);
      queryClient.invalidateQueries(["amountOfCartItems", cartIdentifier]);
      queryClient.invalidateQueries(["userCartData", cartIdentifier]);
      toast.success("Produkt dodany do koszyka!");
    },
    onError: (error) => console.log(error),
  });

  return { addItemToCart, addingItemToCart };
}

export default UseAddItemToCartMutation;
