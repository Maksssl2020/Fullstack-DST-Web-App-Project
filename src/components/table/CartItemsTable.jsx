import React from "react";
import { useQuery } from "react-query";
import {
  getShoppingCartId,
  getShoppingCartItems,
} from "../../helpers/api-integration/ShoppingCartHandling";
import Spinner from "../universal/Spinner";
import { formatCurrency } from "../../helpers/CurrencyFormatter";
import AnimatedCancelButton from "../universal/AnimatedCancelButton";
import CartItemsTableRow from "./CartItemsTableRow";

const CartItemsTable = ({ cartIdentifier }) => {
  const { data: cartId, isLoading: fetchingCartId } = useQuery(
    ["cartPageData", cartIdentifier],
    () => getShoppingCartId(cartIdentifier),
  );

  const { data: cartItems, isLoading: fetchingCartItems } = useQuery(
    ["cartPageItems", cartId],
    () => getShoppingCartItems(cartId),
  );

  if (fetchingCartId || fetchingCartItems) {
    return <Spinner />;
  }

  console.log(cartItems);

  return (
    <>
      {cartItems.length > 0 ? (
        <>
          <div className="w-[90%] h-[100px] bg-custom-gray-300 rounded-2xl grid grid-cols-6 items-center text-2xl ">
            <p className="col-span-1 justify-center flex" />
            <p className="col-span-2 flex">Produkt:</p>
            <p className="col-span-1 justify-center flex">Cena:</p>
            <p className="col-span-1 justify-center flex">Ilosc:</p>
            <p className="col-span-1 justify-center flex">Kwota:</p>
          </div>
          <div className="w-[90%] h-[100px] rounded-2xl text-2xl">
            {cartItems.map((data, index) => (
              <div
                key={index}
                className="border-b-4 border-custom-gray-300 grid grid-cols-6 items-center pb-4 "
              >
                <CartItemsTableRow
                  columnWidth={"col-span-3"}
                  className={"items-center flex gap-8"}
                >
                  <AnimatedCancelButton
                    onClick={undefined}
                    iconSize={"size-10"}
                  />
                  <img
                    className="size-[100px] inset-0 object-cover"
                    src={`data:image/png;base64,${data.mainImage}`}
                    alt={data.productFullTitle}
                  />
                  <p>{`${data.productFullTitle} ${data.productSize !== null ? " - " + data.productSize : ""}`}</p>
                </CartItemsTableRow>
                <CartItemsTableRow>
                  <p className="col-span-1 justify-center flex">
                    {formatCurrency(data.unitPrice)}
                  </p>
                </CartItemsTableRow>
                <CartItemsTableRow>
                  <p className="col-span-1 justify-center flex">
                    {data.quantity}
                  </p>
                </CartItemsTableRow>
                <CartItemsTableRow>
                  <p className="col-span-1 justify-center flex">
                    {formatCurrency(data.totalPrice)}
                  </p>
                </CartItemsTableRow>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="uppercase text-2xl w-[90%] h-auto flex justify-center items-center">
          brak produktów w koszyku
        </div>
      )}
    </>
  );
};

export default CartItemsTable;
