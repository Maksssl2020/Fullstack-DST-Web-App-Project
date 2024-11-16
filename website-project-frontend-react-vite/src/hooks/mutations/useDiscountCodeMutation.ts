import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { fetchDiscountCode } from "../../helpers/api-calls/DiscountCodesHandling.js";

function UseDiscountCodeMutation(onSuccessCallback) {
  const { mutate: fetchDiscountCodeData, isLoading: fetchingDiscountCodeData } =
    useMutation({
      mutationKey: ["enteredDiscountCodeData"],
      mutationFn: (discountCode) => fetchDiscountCode(discountCode),
      onSuccess: (discountCodeData) => {
        console.log(discountCodeData);
        if (onSuccessCallback) {
          onSuccessCallback(discountCodeData);
        }
      },
      onError: () => {
        toast.error("Wprowadzony kod jest nieprawidłowy bądż nieaktywny!");
      },
    });

  return { fetchDiscountCodeData, fetchingDiscountCodeData };
}

export default UseDiscountCodeMutation;
