import React from "react";
import { formatCurrency } from "../../helpers/CurrencyFormatter";
import {
  getOrderStatus,
  getPaymentStatus,
  getShippingType,
} from "../../helpers/ApiDataTranslator";
import OrderPageItemsTable from "../table/OrderPageItemsTable";
import ButtonWithLink from "../universal/ButtonWithLink";
import DefaultModal from "../modal/DefaultModal";
import { DateTimeParser } from "../../helpers/Date";
import { useMutation, useQueryClient } from "react-query";
import { handleUpdateOrderStatus } from "../../helpers/api-integration/OrdersHandling";
import toast from "react-hot-toast";
import Spinner from "../universal/Spinner";
import { calcCartTotalPriceWithDiscount } from "../../helpers/ApplyDiscountCodes";

const OrderAdminCard = ({ orderData }) => {
  const queryClient = useQueryClient();
  const [changeOrderStatus, setChangeOrderStatus] = React.useState();

  const { mutate: updateOrderStatus, isLoading: updatingOrderStatus } =
    useMutation({
      mutationKey: ["updateOrderStatus", orderData.id],
      mutationFn: (newOrderStatus) => {
        if (newOrderStatus !== undefined) {
          return handleUpdateOrderStatus(orderData.id, newOrderStatus);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries("ordersData");
        toast.success("Zaktualizowano status zamówienia!");
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const {
    id,
    customerBillingData,
    orderDate,
    orderStatus,
    payment,
    purchasedItems,
    shippingData,
    discountCode,
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

  console.log(orderData);

  if (updatingOrderStatus) {
    return <Spinner />;
  }

  const handleUpdateOrderStatusClick = (orderStatus) => {
    updateOrderStatus(orderStatus);
  };

  return (
    <div
      className={
        "w-full min-h-[350px] text-lg h-auto justify-between flex bg-custom-gray-300 rounded-2xl border-4 border-black p-2"
      }
    >
      <div className={"h-full w-[35%] flex-col flex gap-4"}>
        <h2 className={"text-2xl font-bold"}>Dane kupującego:</h2>
        <div className={"w-full h-full flex flex-col"}>
          <div className={"w-full flex justify-between"}>
            <p>Imię i nazwisko: </p>
            <p>
              {firstName} {lastName}
            </p>
          </div>
          {companyName && (
            <div className={"w-full flex justify-between"}>
              <p>Nazwa firmy:</p>
              <p>{companyName}</p>
            </div>
          )}
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
            <p>Kod pocztowy:</p>
            <p>{billingPostalCode}</p>
          </div>
          <div className={"w-full flex justify-between"}>
            <p>Ulica i numer:</p>
            <p>
              {billingStreet} {billingBuildingNumber}
            </p>
          </div>
        </div>
        <h2 className={"text-2xl font-bold"}>Dane do wysyłki:</h2>
        {shippingType === "COURIER" ? (
          <div className={"w-full h-full flex flex-col"}>
            <div className={"w-full flex justify-between"}>
              <p>Miejscowość:</p>
              <p>{city}</p>
            </div>
            <div className={"w-full flex justify-between"}>
              <p>Kod pocztowy:</p>
              <p>{postalCode}</p>
            </div>
            <div className={"w-full flex justify-between"}>
              <p>Ulica:</p>
              <p>{`${street} ${buildingNumber}`}</p>
            </div>
          </div>
        ) : (
          <div className={"w-full h-fsull flex flex-col"}>
            <div className={"w-full flex justify-between"}>
              <p>Numer paczkomatu:</p>
              <p>1234</p>
            </div>
          </div>
        )}
      </div>
      <div className={"h-full w-[35%] gap-4 flex flex-col"}>
        <h2 className={"text-2xl font-bold"}>Dane zamówienia:</h2>
        <div className={"w-full h-full flex flex-col"}>
          <div className={"w-full flex justify-between"}>
            <p>ID zamówienia:</p>
            <p>{`#${id}`}</p>
          </div>
          <div className={"w-full flex justify-between"}>
            <p>Data zamówienia:</p>
            <p>{DateTimeParser(orderDate)}</p>
          </div>
          <div className={"w-full flex justify-between"}>
            <p>Status zamówienia:</p>
            <p>{getOrderStatus(orderStatus)}</p>
          </div>
          <div className={"w-full flex justify-between"}>
            <p>Kwota zamówienia:</p>
            <p>{formatCurrency(amount)}</p>
          </div>
          {discountCode && (
            <div className={"w-full flex justify-between"}>
              <p>Zniżka:</p>
              <p>{calcCartTotalPriceWithDiscount(discountCode, amount)}</p>
            </div>
          )}
          <div className={"w-full flex justify-between"}>
            <p>Status płatności:</p>
            <p>{getPaymentStatus(status)}</p>
          </div>
          <div className={"w-full flex justify-between"}>
            <p>Sposób dostawy:</p>
            <p>{getShippingType(shippingType)}</p>
          </div>
          <div className={"w-full flex flex-col"}>
            <p>Lista zakupionych produktów:</p>
          </div>
          <div className={"pt-4"}>
            <OrderPageItemsTable
              purchasedItems={purchasedItems}
              withImage={false}
            />
          </div>
        </div>
      </div>
      <div className={"h-full w-[20%]"}>
        <div className={"w-full h-full flex flex-col gap-2"}>
          <ButtonWithLink
            className={
              "bg-custom-orange-200 rounded-2xl h-[50px] border-4 border-black uppercase font-bold text-white text-sm"
            }
            title={"zmień status zamówienia"}
            onClick={() => setChangeOrderStatus(true)}
          />
          <ButtonWithLink
            className={
              "bg-custom-orange-200 rounded-2xl h-[50px] border-4 border-black uppercase font-bold text-white text-sm"
            }
            title={"anuluj zamówienie"}
            onClick={() => handleUpdateOrderStatusClick("CANCELED")}
          />
        </div>
      </div>
      {changeOrderStatus && (
        <DefaultModal title={"Wybierz status zamówienia"}>
          <ul className={"w-full flex flex-col gap-4"}>
            <li className={"w-full"}>
              <ButtonWithLink
                className={
                  "bg-custom-orange-200 w-full rounded-2xl h-[50px] border-4 border-black uppercase font-bold text-white text-xl"
                }
                title={"W realizacji"}
                onClick={() => {
                  setChangeOrderStatus(false);
                  handleUpdateOrderStatusClick("IN_PROGRESS");
                }}
              />
            </li>
            <li className={"w-full"}>
              <ButtonWithLink
                className={
                  "bg-custom-orange-200 w-full rounded-2xl h-[50px] border-4 border-black uppercase font-bold text-white text-xl"
                }
                title={"Wysłane"}
                onClick={() => {
                  setChangeOrderStatus(false);
                  handleUpdateOrderStatusClick("SENT");
                }}
              />
            </li>
          </ul>
        </DefaultModal>
      )}
    </div>
  );
};

export default OrderAdminCard;
