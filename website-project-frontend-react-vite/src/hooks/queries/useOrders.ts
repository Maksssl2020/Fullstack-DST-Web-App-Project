import { useQuery } from "react-query";
import { fetchAllOrders } from "../../helpers/api-calls/OrdersHandling.js";

function useOrders(currentPage) {
  const {
    data: orders,
    isLoading: fetchingOrders,
    refetch,
  } = useQuery(["ordersData"], () => fetchAllOrders(currentPage));

  return { orders, fetchingOrders, refetch };
}

export default useOrders;
