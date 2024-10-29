import useAuthentication from "../others/useAuthentication.js";
import { useQuery } from "react-query";
import { fetchAllUserProductsMarkedAsFavourite } from "../../helpers/api-integration/FavouriteProductsHandling.js";

function UseUserItemsMarkedAsFavouriteIds() {
  const { userId } = useAuthentication();

  const {
    data: userItemsMarkedAsFavourite,
    isLoading: fetchingUserItemsMarkedAsFavourite,
  } = useQuery(["userItemsMarkedAsFavourite", userId], () => {
    if (userId !== undefined) {
      return fetchAllUserProductsMarkedAsFavourite(userId);
    }
  });

  return { userItemsMarkedAsFavourite, fetchingUserItemsMarkedAsFavourite };
}

export default UseUserItemsMarkedAsFavouriteIds;
