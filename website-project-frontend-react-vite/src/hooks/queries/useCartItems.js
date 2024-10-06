import { useQuery } from "react-query";
import { getShoppingCartItems } from "../../helpers/api-integration/ShoppingCartHandling.js";

function UseCartItems(cartId, cartIdentifier) {
  const { data: cartItems, isLoading: fetchingCartItems } = useQuery(
    ["cartItems", cartIdentifier],
    () => {
      return getShoppingCartItems(cartId);
    },
  );

  return { cartItems, fetchingCartItems };
}

export default UseCartItems;
