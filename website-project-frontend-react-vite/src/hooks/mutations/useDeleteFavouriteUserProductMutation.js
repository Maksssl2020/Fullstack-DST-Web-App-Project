import useAuthentication from "../others/useAuthentication.js";
import { useMutation, useQueryClient } from "react-query";
import { handleDeleteUserFavouriteProduct } from "../../helpers/api-integration/FavouriteProductsHandling.js";
import toast from "react-hot-toast";

function UseDeleteFavouriteUserProductMutation() {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const {
    mutate: deleteFavouriteUserProduct,
    isLoading: deletingFavouriteUserProduct,
  } = useMutation(
    ["deleteFavouriteUserProduct"],
    (itemId) => {
      if (userId) {
        return handleDeleteUserFavouriteProduct(itemId);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userFavouriteUserProducts", userId]);
        queryClient.invalidateQueries(["userItemsMarkedAsFavourite", userId]);
        toast.success("Produkt został usunięty z ulubionych!");
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return { deleteFavouriteUserProduct, deletingFavouriteUserProduct };
}

export default UseDeleteFavouriteUserProductMutation;
