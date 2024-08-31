import React from "react";
import { DateTimeParser } from "../../helpers/Date";
import {
  getOrderStatus,
  getShippingType,
} from "../../helpers/ApiDataTranslator";
import { formatCurrency } from "../../helpers/CurrencyFormatter";
import OrderPageItemsTable from "../table/OrderPageItemsTable";

const OrderUserViewCard = ({ orderData }) => {
  console.log(orderData);

  const {
    id,
    customerBillingData,
    orderDate,
    orderStatus,
    payment,
    purchasedItems,
    shippingData,
  } = orderData;
  const {
    firstName,
    lastName,
    postalCode: billingPostalCode,
    city: billingCity,
    email,
    phoneNumber,
    street: billingStreet,
    companyName,
    buildingNumber: billingBuildingNumber,
  } = customerBillingData;

  const { amount, result, status } = payment;
  const { buildingNumber, city, postalCode, shippingType, street } =
    shippingData;

  return (
    <div
      className={
        "w-full min-h-[350px] text-lg h-auto justify-between flex bg-custom-gray-300 rounded-2xl border-4 border-black"
      }
    >
      <div className={"grid grid-cols-5 w-full"}>
        <div
          className={
            "col-span-3 h-full p-2 rounded-l-xl border-r-2 border-black flex flex-col"
          }
        >
          <h2 className={"font-bold text-2xl mb-4"}>Zakupione produkty:</h2>
          <div className={"w-full"}>
            <OrderPageItemsTable
              purchasedItems={purchasedItems}
              withImage={true}
            />
          </div>
        </div>
        <div className={"col-span-2 p-2 border-l-2 border-black"}>
          <div className={"w-full flex flex-col"}>
            <h2 className={"font-bold text-2xl mb-4"}>Dane zamówienia:</h2>
            <div className={"w-full flex justify-between"}>
              <p>Data zamówienia:</p>
              <p>{DateTimeParser(orderDate)}</p>
            </div>
            <div className={"w-full flex justify-between"}>
              <p>Id zamówienia:</p>
              <p>{`#${id}`}</p>
            </div>
            <div className={"w-full flex justify-between"}>
              <p>Status zamówienia:</p>
              <p>{getOrderStatus(orderStatus)}</p>
            </div>
            <div className={"w-full flex justify-between"}>
              <p>Kwota zamówienia:</p>
              <p>{formatCurrency(amount)}</p>
            </div>
            <div className={"w-full flex justify-between"}>
              <p>Rodzaj wysyłki:</p>
              <p>{getShippingType(shippingType)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderUserViewCard;
