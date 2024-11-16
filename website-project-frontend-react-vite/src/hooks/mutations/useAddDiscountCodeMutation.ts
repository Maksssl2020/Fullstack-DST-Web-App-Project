import { useMutation, useQueryClient } from "react-query";
import { handleAddNewDiscountCode } from "../../helpers/api-calls/DiscountCodesHandling.js";

function UseAddDiscountCodeMutation(onSuccessCallback) {
  const queryClient = useQueryClient();

  const { mutate: addDiscountCode, isLoading: addingDiscountCode } =
    useMutation({
      mutationKey: ["addingNewDiscountCode"],
      mutationFn: (discountCodeData) =>
        handleAddNewDiscountCode(discountCodeData),
      onSuccess: () => {
        queryClient.invalidateQueries("allDiscountCodesData");

        if (onSuccessCallback) {
          onSuccessCallback();
        }
      },
      onError: (error) => console.log(error),
    });

  return { addDiscountCode, addingDiscountCode };
}

export default UseAddDiscountCodeMutation;
