import { useQuery } from "react-query";
import { fetchOrdersByUserId } from "../../helpers/api-integration/OrdersHandling.js";

function UseUserOrders(userId) {
  const { data: userOrders, isLoading: fetchingUserOrders } = useQuery(
    ["userOrders", userId],
    () => fetchOrdersByUserId(userId),
  );

  return { userOrders, fetchingUserOrders };
}

export default UseUserOrders;
