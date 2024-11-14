import React, { useEffect } from "react";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import Spinner from "../components/universal/Spinner.jsx";
import OrderAdminCard from "../components/card/OrderAdminCard.jsx";
import useOrders from "../hooks/queries/useOrders.js";
import Pagination from "../components/pagination/Pagination.jsx";

const Orders = () => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const { orders, fetchingOrders, refetch } = useOrders(currentPage);

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

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
          {orders?.content.map((data, index) => (
            <OrderAdminCard orderData={data} key={index} />
          ))}
        </div>
        <Pagination
          totalPages={orders.totalPages}
          currentPage={currentPage}
          setCurrentPageFunc={setCurrentPage}
        />
      </div>
    </AnimatedPage>
  );
};

export default Orders;
