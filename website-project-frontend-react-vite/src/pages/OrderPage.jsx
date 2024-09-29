import React from "react";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import MainBannerWithoutLogo from "../components/universal/MainBannerWithoutLogo.jsx";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
  fetchOrderByOrderId,
  fetchOrdersByUserId,
} from "../helpers/api-integration/OrdersHandling.js";
import Spinner from "../components/universal/Spinner.jsx";
import OrderPageItemsTable from "../components/table/OrderPageItemsTable.jsx";
import { DateTimeParser } from "../helpers/Date.js";
import UserIcon from "../components/header/icons/UserIcon.jsx";
import ShoppingBagIcon from "../icons/ShoppingBagIcon.jsx";
import {
  getOrderStatus,
  getShippingType,
} from "../helpers/ApiDataTranslator.js";
import { formatCurrency } from "../helpers/CurrencyFormatter.js";

const OrderPage = () => {
  const { orderId } = useParams();

  const { data: orderData, isLoading: fetchingOrderData } = useQuery(
    ["orderPageData", orderId],
    () => fetchOrderByOrderId(orderId),
  );

  console.log(orderData);

  const {
    id,
    orderDate,
    orderStatus,
    customerBillingData,
    shippingData,
    payment,
  } = orderData;
  const { firstName, lastName, email, phoneNumber } = customerBillingData;
  const { shippingType } = shippingData;
  const { amount } = payment;

  if (fetchingOrderData) {
    return <Spinner />;
  }

  return (
    <AnimatedPage>
      <div className="w-full h-auto flex flex-col items-center py-8 bg-custom-gray-400">
        <MainBannerWithoutLogo bannerTitle={"Moje Zamówienie"} />
        <div
          className={
            "h-auto mt-8 w-[1150px] bg-custom-gray-100 rounded-2xl flex flex-col items-center px-8 py-4"
          }
        >
          <div className={"w-full h-auto flex flex-col gap-10"}>
            <div className={"h-auto text-xl flex flex-col"}>
              <p className={"font-bold"}>{`ID zamówienia: #${id}`}</p>
              <p>{`Data zamówienia: ${DateTimeParser(orderDate)}`}</p>
            </div>
            <div
              className={
                "w-full flex justify-between border-4 border-black rounded-2xl p-4"
              }
            >
              <div className="flex items-center gap-4">
                <p
                  className={
                    "size-14 mb-auto rounded-full border-2 border-black flex items-center justify-center"
                  }
                >
                  <UserIcon size={"size-10"} />
                </p>
                <div className={"flex flex-col gap-2"}>
                  <h3 className={"text-3xl font-bold uppercase"}>Kupujący</h3>
                  <div className="flex gap-2">
                    <p className={"font-bold"}>Imię i nazwisko:</p>
                    <p>{`${firstName} ${lastName}`}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className={"font-bold"}>E-mail:</p>
                    <p>{email}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className={"font-bold"}>Numer telefonu:</p>
                    <p>{phoneNumber}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p
                  className={
                    "size-14 mb-auto rounded-full border-2 border-black flex items-center justify-center"
                  }
                >
                  <ShoppingBagIcon size={"size-10"} />
                </p>
                <div className={"flex flex-col gap-2"}>
                  <h3 className={"text-3xl font-bold uppercase"}>Zamówienie</h3>
                  <div className="flex gap-2">
                    <p className={"font-bold"}>Metoda dostawy:</p>
                    <p>{getShippingType(shippingType)}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className={"font-bold"}>Kwota zamówienia:</p>
                    <p>{formatCurrency(amount)}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className={"font-bold"}>Status zamówienia:</p>
                    <p>{getOrderStatus(orderStatus)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={"w-full flex flex-col gap-4 justify-center"}>
              <h2 className={"ml-3 text-3xl font-bold"}>Zamówione produkty:</h2>
              <OrderPageItemsTable orderId={orderId} />
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default OrderPage;
