import { useMutation } from "react-query";
import { handleAddNewOrder } from "../../helpers/api-calls/OrdersHandling.js";
import toast from "react-hot-toast";

function UseCreateOrderMutation(onSuccessCallback) {
  const { mutate: createOrder, isLoading: creatingOrder } = useMutation({
    mutationKey: ["createOrder"],
    mutationFn: (orderData) => handleAddNewOrder(orderData),
    onSuccess: (orderId) => {
      if (onSuccessCallback) {
        onSuccessCallback(orderId);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { createOrder, creatingOrder };
}

export default UseCreateOrderMutation;
