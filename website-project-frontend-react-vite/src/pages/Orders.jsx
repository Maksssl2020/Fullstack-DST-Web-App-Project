import React from "react";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import Spinner from "../components/universal/Spinner.jsx";
import OrderAdminCard from "../components/card/OrderAdminCard.jsx";
import useOrders from "../hooks/queries/useOrders.js";

const Orders = () => {
  const { orders, fetchingOrders } = useOrders();

  if (fetchingOrders) {
    return <Spinner />;
  }

  return (
    <AnimatedPage>
      <div className="w-full h-auto flex flex-col items-center py-8 bg-custom-gray-400">
        <div
          className={
            "w-[1150px] h-auto bg-custom-gray-100 rounded-2xl flex flex-col p-4 gap-4"
          }
        >
          {orders?.map((data, index) => (
            <OrderAdminCard orderData={data} key={index} />
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Orders;
