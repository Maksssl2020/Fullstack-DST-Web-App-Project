import React from "react";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import { useQuery } from "react-query";
import { fetchAllOrders } from "../helpers/api-integration/OrdersHandling.js";
import Spinner from "../components/universal/Spinner.jsx";
import OrderAdminCard from "../components/card/OrderAdminCard.jsx";

const Orders = () => {
  const { data: ordersData, isLoading: fetchingOrdersData } = useQuery(
    ["ordersData"],
    () => fetchAllOrders(),
  );

  if (fetchingOrdersData) {
    return <Spinner />;
  }

  console.log(ordersData);

  return (
    <AnimatedPage>
      <div className="w-full h-auto flex flex-col items-center py-8 bg-custom-gray-400">
        <div
          className={
            "w-[1150px] h-auto bg-custom-gray-100 rounded-2xl flex flex-col p-4 gap-4"
          }
        >
          {ordersData?.map((data, index) => (
            <OrderAdminCard orderData={data} key={index} />
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Orders;
