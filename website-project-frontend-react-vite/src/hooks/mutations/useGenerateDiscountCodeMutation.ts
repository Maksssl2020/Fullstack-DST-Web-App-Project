import { useMutation } from "react-query";
import { generateRandomDiscountCode } from "../../helpers/api-calls/DiscountCodesHandling.js";

function UseGenerateDiscountCodeMutation(onSuccessCallback) {
  const { mutate: generateCode, isLoading: generatingCode } = useMutation({
    mutationKey: ["generatedCode"],
    mutationFn: () => generateRandomDiscountCode(),
    onSuccess: (response) => {
      if (onSuccessCallback) {
        onSuccessCallback(response);
      }
    },
    onError: (error) => console.log(error),
  });

  return { generateCode, generatingCode };
}

export default UseGenerateDiscountCodeMutation;
