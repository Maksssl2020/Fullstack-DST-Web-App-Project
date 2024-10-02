import { useQuery } from "react-query";
import { fetchShoppingCartByIdentifier } from "../../helpers/api-integration/ShoppingCartHandling.js";
import useAuthentication from "./useAuthentication.js";

function UseCart(cartIdentifier) {
  const { isAuthenticated } = useAuthentication();

  const { data: cart, isLoading: fetchingCart } = useQuery(
    [`userCartData${cartIdentifier}`, cartIdentifier, isAuthenticated],
    () => fetchShoppingCartByIdentifier(cartIdentifier, isAuthenticated),
  );

  return { cart, fetchingCart };
}

export default UseCart;
