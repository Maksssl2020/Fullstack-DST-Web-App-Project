import useAuthentication from "./useAuthentication.js";
import { useQuery } from "react-query";
import { fetchAllUserFavouriteProducts } from "../../helpers/api-integration/FavouriteProductsHandling.js";

function UseFavouriteUserProducts() {
  const { userId } = useAuthentication();

  const {
    data: userFavouriteProducts,
    isLoading: fetchingUserFavouriteProducts,
  } = useQuery(["userFavouriteUserProducts", userId], () =>
    fetchAllUserFavouriteProducts(userId),
  );

  return { userFavouriteProducts, fetchingUserFavouriteProducts };
}

export default UseFavouriteUserProducts;
