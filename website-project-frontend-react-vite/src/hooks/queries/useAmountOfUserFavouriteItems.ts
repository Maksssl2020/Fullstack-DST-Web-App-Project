import useAuthentication from "../others/useAuthentication.js";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchAmountOfUserFavouriteItems } from "../../helpers/api-calls/FavouriteProductsHandling.js";

function UseAmountOfUserFavouriteItems() {
  const location = useLocation();
  const { userId } = useAuthentication();

  const {
    data: amountOfUserFavouriteItems,
    isLoading: fetchingAmountOfUserFavouriteItems,
  } = useQuery(["amountOfUserFavouriteItems", userId], () => {
    if (userId !== undefined && location.pathname.includes("rainbow-shop")) {
      return fetchAmountOfUserFavouriteItems(userId);
    }
  });

  return { amountOfUserFavouriteItems, fetchingAmountOfUserFavouriteItems };
}

export default UseAmountOfUserFavouriteItems;
