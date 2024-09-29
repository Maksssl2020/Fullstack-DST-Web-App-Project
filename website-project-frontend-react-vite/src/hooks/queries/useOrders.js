import { useQuery } from "react-query";
import { fetchAllOrders } from "../../helpers/api-integration/OrdersHandling.js";

function useOrders() {
  const { data: orders, isLoading: fetchingOrders } = useQuery(
    ["ordersData"],
    () => fetchAllOrders(),
  );

  return { orders, fetchingOrders };
}

export default useOrders;
