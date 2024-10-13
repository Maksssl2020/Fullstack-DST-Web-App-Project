import { useMutation } from "react-query";
import { handleApplyDiscountCodeInCart } from "../../helpers/api-integration/DiscountCodesHandling.js";

function UseApplyDiscountCodeInCart(onSuccessCallback) {
  const {
    mutate: applyDiscountCodeInCart,
    isLoading: applyingDiscountCodeInCart,
  } = useMutation({
    mutationKey: ["applyDiscountCodeInCart"],
    mutationFn: ({ cartId, userId }) =>
      handleApplyDiscountCodeInCart(cartId, userId),
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { applyDiscountCodeInCart, applyingDiscountCodeInCart };
}

export default UseApplyDiscountCodeInCart;
