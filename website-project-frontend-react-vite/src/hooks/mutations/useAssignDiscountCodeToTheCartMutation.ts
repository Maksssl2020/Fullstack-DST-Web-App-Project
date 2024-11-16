import { useMutation } from "react-query";
import { isDiscountCodeValid } from "../../helpers/DiscountCodesHandler.js";
import { handleAssignDiscountCodeToCart } from "../../helpers/api-calls/DiscountCodesHandling.js";
import toast from "react-hot-toast";
import useAuthentication from "../others/useAuthentication.js";

function UseAssignDiscountCodeToTheCartMutation(
  cartTotalPrice,
  cartIdentifier,
  setAssignedDiscountCode,
  onSuccessCallback,
) {
  const { isAuthenticated } = useAuthentication();

  const { mutate: assignDiscountCodeToCart, isLoading: assigningDiscountCode } =
    useMutation({
      mutationKey: ["assignDiscountCodeToCart"],
      mutationFn: (discountCodeData) => {
        if (
          isDiscountCodeValid(discountCodeData, cartTotalPrice, isAuthenticated)
        ) {
          setAssignedDiscountCode(discountCodeData);
          return handleAssignDiscountCodeToCart(
            cartIdentifier,
            discountCodeData.discountCode,
          );
        }
      },
      onSuccess: (test) => {
        console.log(test);
        if (onSuccessCallback) {
          onSuccessCallback();
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { assigningDiscountCode, assignDiscountCodeToCart };
}

export default UseAssignDiscountCodeToTheCartMutation;
