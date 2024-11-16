import { useMutation } from "react-query";
import { handleProcessPayment } from "../../helpers/api-calls/PaymentsHandling.js";
import toast from "react-hot-toast";

function UseCreatePaymentMutation(onSuccessCallback) {
  const { mutate: createPayment, isLoading: creatingPayment } = useMutation({
    mutationKey: ["createPayment"],
    mutationFn: (paymentData) => handleProcessPayment(paymentData),
    onSuccess: (redirectUrl) => {
      window.location.replace(redirectUrl);
      toast.success("Złożono nowe zamówienie!");

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error) => console.log(error),
  });

  return { createPayment, creatingPayment };
}

export default UseCreatePaymentMutation;
