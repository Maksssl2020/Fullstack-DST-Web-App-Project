import { useQuery } from "react-query";
import { getShoppingCartAmountOfItems } from "../../helpers/api-integration/ShoppingCartHandling.js";
import { useLocation } from "react-router-dom";
import useCartId from "./useCartId.js";

function UseCartAmountOfItems(cartIdentifier) {
  const location = useLocation();
  const { cartId } = useCartId(cartIdentifier);

  const { data: amountOfCartItems, isLoading: fetchingAmountOfCartItems } =
    useQuery(["amountOfCartItems", cartIdentifier], () => {
      if (location.pathname.includes("rainbow-shop") === true) {
        return getShoppingCartAmountOfItems(cartId);
      }
    });

  return { amountOfCartItems, fetchingAmountOfCartItems };
}

export default UseCartAmountOfItems;
