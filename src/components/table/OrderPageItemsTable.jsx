import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import ItemsTableRow from "./ItemsTableRow";
import { formatCurrency } from "../../helpers/CurrencyFormatter";
import { useQuery } from "react-query";
import { getShoppingCartItems } from "../../helpers/api-integration/ShoppingCartHandling";
import Spinner from "../universal/Spinner";

const OrderPageItemsTable = ({
  cartId = undefined,
  purchasedItems = [],
  withImage = true,
}) => {
  const { data: itemsData = purchasedItems, isLoading: fetchingItemsData } =
    useQuery(["itemsTableData", cartId], () => {
      if (cartId !== undefined) {
        return getShoppingCartItems(cartId);
      }
    });

  if (fetchingItemsData) {
    return <Spinner />;
  }

  return (
    <div className={`h-auto rounded-2xl text-2xl w-full`}>
      <div
        className={`w-full h-[100px] bg-custom-gray-300 rounded-2xl items-center grid text-2xl grid-cols-5 pl-2`}
      >
        <p className="col-span-2 flex">Produkt:</p>
        <p className="col-span-1 justify-center flex">Cena:</p>
        <p className="col-span-1 justify-center flex">Ilosc:</p>
        <p className="col-span-1 justify-center flex">Kwota:</p>
      </div>
      <div className="w-full h-auto rounded-2xl text-2xl">
        <AnimatePresence mode={"popLayout"}>
          {itemsData?.map((data) => (
            <motion.div
              layout
              key={data.id}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              className={`border-b-4 border-custom-gray-300 grid items-center pb-4 mt-4 grid-cols-5 text-xl pl-2`}
            >
              <ItemsTableRow
                columnWidth={"col-span-2"}
                className={"items-center flex gap-8"}
              >
                {!cartId && withImage && (
                  <>
                    <img
                      className="size-[100px] inset-0 object-cover"
                      src={`data:image/png;base64,${data.mainImage}`}
                      alt={data.productFullTitle}
                    />
                  </>
                )}
                <p>{`${data.productFullTitle} ${data.productSize !== null ? " - " + data.productSize : ""}`}</p>
              </ItemsTableRow>
              <ItemsTableRow>
                <p className="justify-center flex">
                  {formatCurrency(data.unitPrice)}
                </p>
              </ItemsTableRow>
              <ItemsTableRow>
                <p className="justify-center flex">{data.quantity}</p>
              </ItemsTableRow>
              <ItemsTableRow>
                <p className="justify-center flex">
                  {formatCurrency(data.totalPrice)}
                </p>
              </ItemsTableRow>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OrderPageItemsTable;
