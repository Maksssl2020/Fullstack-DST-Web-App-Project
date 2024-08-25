import React from "react";
import { formatCurrency } from "../../helpers/CurrencyFormatter";
import {
  getPaymentStatus,
  getShippingType,
} from "../../helpers/ApiDataTranslator";
import { useQuery } from "react-query";
import { fetchOrderPurchasedItems } from "../../helpers/api-integration/OrdersHandling";
import Spinner from "../universal/Spinner";
import OrderPageItemsTable from "../table/OrderPageItemsTable";

const OrderAdminCard = ({ orderData }) => {
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

  console.log(purchasedItems);

  return (
    <div
      className={
        "w-full min-h-[350px] text-lg h-auto justify-between flex bg-custom-gray-300 rounded-2xl border-4 border-black p-2"
      }
    >
      <div className={"h-full w-[33%]"}>
        <h2 className={"text-2xl font-bold"}>Dane kupującego:</h2>
        <div className={"w-full h-full flex flex-col"}>
          <div className={"w-full flex justify-between"}>
            <p>Imię i nazwisko: </p>
            <p>
              {firstName} {lastName}
            </p>
          </div>
          <div className={"w-full flex justify-between"}>
            <p>E-mail:</p>
            <p>{email}</p>
          </div>
          <div className={"w-full flex justify-between"}>
            <p>Numer telefonu:</p>
            <p>{phoneNumber}</p>
          </div>
          <div className={"w-full flex justify-between"}>
            <p>Miejscowość:</p>
            <p>{billingCity}</p>
          </div>
          <div className={"w-full flex justify-between"}>
            <p>Ulica i numer:</p>
            <p>
              {billingStreet} {billingBuildingNumber}
            </p>
          </div>
        </div>
      </div>
      <div className={"h-full w-[35%]"}>
        <h2 className={"text-2xl font-bold"}>Dane zamówienia:</h2>
        <div className={"w-full h-full flex flex-col"}>
          <div className={"w-full flex justify-between"}>
            <p>ID zamówienia:</p>
            <p>{`#${id}`}</p>
          </div>
          <div className={"w-full flex justify-between"}>
            <p>Kwota zamówienia:</p>
            <p>{formatCurrency(amount)}</p>
          </div>
          <div className={"w-full flex justify-between"}>
            <p>Status płatności:</p>
            <p>{getPaymentStatus(status)}</p>
          </div>
          <div className={"w-full flex justify-between"}>
            <p>Wybrany sposób dostawy</p>
            <p>{getShippingType(shippingType)}</p>
          </div>
          <div className={"w-full flex flex-col"}>
            <p>Lista zakupionych produktów:</p>
          </div>
          <OrderPageItemsTable
            purchasedItems={purchasedItems}
            withImage={false}
          />
        </div>
      </div>
      <div className={"h-full w-[25%]"}>
        <h2 className={"text-2xl font-bold"}>Dostępne czynności:</h2>
        <div className={"w-full h-full flex flex-col"}>
          <p>{`Zmień status zamówienia:`}</p>
          <p>{`Powiadom e-mailem:`}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderAdminCard;
