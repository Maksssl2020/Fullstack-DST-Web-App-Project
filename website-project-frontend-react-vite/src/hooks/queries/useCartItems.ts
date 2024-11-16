import { useQuery } from "react-query";
import { getShoppingCartItems } from "../../helpers/api-calls/ShoppingCartHandling.js";

function UseCartItems(cartId, cartIdentifier) {
  const { data: cartItems, isLoading: fetchingCartItems } = useQuery(
    ["cartItems", cartIdentifier],
    () => {
      if (cartId) {
        return getShoppingCartItems(cartId);
      }
    },
  );

  return { cartItems, fetchingCartItems };
}

export default UseCartItems;
