import { useQuery } from "react-query";
import { getShoppingCartId } from "../../helpers/api-integration/ShoppingCartHandling.js";
import useAuthentication from "./useAuthentication.js";
import { useLocation } from "react-router-dom";

function UseCartId(cartIdentifier) {
  const location = useLocation();
  const { isAuthenticated } = useAuthentication();

  const { data: cartId, isLoading: fetchingCartId } = useQuery(
    ["cartId", cartIdentifier],
    () => {
      if (location.pathname.includes("/rainbow-shop") === true) {
        return getShoppingCartId(cartIdentifier, isAuthenticated);
      }
    },
  );

  return { cartId, fetchingCartId };
}

export default UseCartId;
