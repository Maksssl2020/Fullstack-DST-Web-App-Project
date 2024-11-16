import useAuthentication from "../others/useAuthentication.js";
import { useMutation, useQueryClient } from "react-query";
import { saveUserFavouriteProduct } from "../../helpers/api-calls/FavouriteProductsHandling.js";
import toast from "react-hot-toast";

function UseAddFavouriteUserProductMutation() {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: addFavouriteProduct, isLoading: addingFavouriteProduct } =
    useMutation({
      mutationKey: ["addFavouriteProduct"],
      mutationFn: ({ mainProductId, cardColor }) =>
        saveUserFavouriteProduct(userId, mainProductId, cardColor),
      onSuccess: () => {
        queryClient.invalidateQueries("userFavouriteUserProducts", userId);
        toast.success("Dodano produkt do ulubionych!");
      },
      onError: (error) => console.log(error),
    });

  return { addFavouriteProduct, addingFavouriteProduct };
}

export default UseAddFavouriteUserProductMutation;
