import { useMutation, useQueryClient } from "react-query";
import { updateProductQuantity } from "../../helpers/api-integration/ShoppingCartHandling.js";

function UseUpdateCartItemQuantity(itemId, cartIdentifier) {
  const queryClient = useQueryClient();

  const {
    mutate: updateCartItemQuantity,
    isLoading: updatingCartItemQuantity,
  } = useMutation({
    mutationKey: ["updateCartProductQuantity", itemId, cartIdentifier],
    mutationFn: (newQuantity) => {
      if (itemId) {
        return updateProductQuantity(itemId, newQuantity);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userCartData", cartIdentifier]);
      queryClient.invalidateQueries(["cartItems", cartIdentifier]);
    },
    onError: (error) => console.log(error),
  });

  return { updateCartItemQuantity, updatingCartItemQuantity };
}

export default UseUpdateCartItemQuantity;
