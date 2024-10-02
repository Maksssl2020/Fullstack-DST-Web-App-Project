import { useQuery } from "react-query";
import { getShoppingCartAmountOfItems } from "../../helpers/api-integration/ShoppingCartHandling.js";
import { useLocation } from "react-router-dom";

function UseCartAmountOfItems(cartId) {
  const location = useLocation();

  const { data: amountOfCartItems, isLoading: fetchingAmountOfCartItems } =
    useQuery([`amountOfCartItems${cartId}`, cartId], () => {
      if (location.pathname.includes("/rainbow-shop") === true) {
        return getShoppingCartAmountOfItems(cartId);
      }
    });

  return { amountOfCartItems, fetchingAmountOfCartItems };
}

export default UseCartAmountOfItems;
