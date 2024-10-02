import { useQuery } from "react-query";
import { getShoppingCartItems } from "../../helpers/api-integration/ShoppingCartHandling.js";

function UseCartItems(cartId) {
  const { data: cartItems, isLoading: fetchingCartItems } = useQuery(
    [`cartItems${cartId}`, cartId],
    () => {
      if (cartId) {
        return getShoppingCartItems(cartId);
      }
    },
  );

  return { cartItems, fetchingCartItems };
}

export default UseCartItems;
