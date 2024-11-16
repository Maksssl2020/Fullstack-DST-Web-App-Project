import { useQuery } from "react-query";
import { fetchOrderByOrderId } from "../../helpers/api-calls/OrdersHandling.js";

function UseOrder(orderId) {
  const { data: order, isLoading: fetchingOrder } = useQuery(
    ["orderData", orderId],
    () => fetchOrderByOrderId(orderId),
  );

  return { order, fetchingOrder };
}

export default UseOrder;
