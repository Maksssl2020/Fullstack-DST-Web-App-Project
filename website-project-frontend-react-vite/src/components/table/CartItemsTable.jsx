import React from "react";
import DefaultModal from "../modal/DefaultModal.jsx";
import ButtonWithLink from "../universal/ButtonWithLink.jsx";
import { AnimatePresence, motion } from "framer-motion";
import ItemsTableRow from "./ItemsTableRow.jsx";
import AnimatedCancelButton from "../universal/AnimatedCancelButton.jsx";
import { formatCurrency } from "../../helpers/CurrencyFormatter.js";
import ProductQuantityButton from "../button/ProductQuantityButton.jsx";
import Spinner from "../universal/Spinner.jsx";
import useCartItems from "../../hooks/queries/useCartItems.js";
import useDeleteItemFromCartMutation from "../../hooks/mutations/useDeleteItemFromCartMutation.js";

const CartItemsTable = ({ cartId, cartIdentifier }) => {
  const { cartItems, fetchingCartItems } = useCartItems(cartId, cartIdentifier);
  const { deleteItemFromCart, deletingItemFromCart } =
    useDeleteItemFromCartMutation(cartIdentifier);

  const handleQuantitySubtraction = (quantity) => {
    if (quantity - 1 >= 1) {
      return quantity - 1;
    } else {
      return quantity;
    }
  };

  const handleQuantityAdding = (quantity) => {
    return quantity + 1;
  };

  if (fetchingCartItems || deletingItemFromCart) {
    return <Spinner />;
  }

  return (
    <>
      {cartItems?.length === 0 && (
        <DefaultModal
          title={"Informacja"}
          subtitle={"Brak produktów w koszyku!"}
        >
          <div className="flex gap-6">
            <ButtonWithLink
              title={"Sklep"}
              link={"/rainbow-shop"}
              className={
                "uppercase font-bold text-white rounded-2xl bg-custom-orange-200 h-[75px] w-[250px] text-xl flex items-center justify-center border-4 border-black"
              }
            />
            <ButtonWithLink
              title={"Strona główna"}
              link={"/"}
              className={
                "uppercase font-bold text-white rounded-2xl bg-custom-orange-200 h-[75px] w-[250px] text-xl flex items-center justify-center border-4 border-black"
              }
            />
          </div>
        </DefaultModal>
      )}

      <div className={`h-auto rounded-2xl text-2xl w-[90%]`}>
        <div
          className={`w-full h-[100px] bg-custom-gray-300 rounded-2xl items-center grid text-2xl grid-cols-6`}
        >
          <p className="col-span-1 justify-center flex" />
          <p className="col-span-2 flex">Produkt:</p>
          <p className="col-span-1 justify-center flex">Cena:</p>
          <p className="col-span-1 justify-center flex">Ilosc:</p>
          <p className="col-span-1 justify-center flex">Kwota:</p>
        </div>
        <div className="w-full h-auto rounded-2xl text-2xl">
          <AnimatePresence mode={"popLayout"}>
            {cartItems?.map((data) => (
              <motion.div
                layout
                key={data.id}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                className={`border-b-4 border-custom-gray-300 grid items-center pb-4 mt-4 grid-cols-6`}
              >
                <ItemsTableRow
                  columnWidth={"col-span-3"}
                  className={"items-center flex gap-8"}
                >
                  <AnimatedCancelButton
                    onClick={() =>
                      deleteItemFromCart({
                        cartItemId: data.id,
                        cartId: cartItems,
                      })
                    }
                    iconSize={"size-10"}
                  />
                  <img
                    className="size-[100px] inset-0 object-cover"
                    src={`data:image/png;base64,${data.mainImage}`}
                    alt={data.productFullTitle}
                  />
                  <p>{`${data.productFullTitle} ${data.productSize !== null ? " - " + data.productSize : ""}`}</p>
                </ItemsTableRow>
                <ItemsTableRow>
                  <p className="col-span-1 justify-center flex">
                    {formatCurrency(data.unitPrice)}
                  </p>
                </ItemsTableRow>
                <ItemsTableRow>
                  <p className="col-span-1 justify-center flex">
                    <ProductQuantityButton
                      itemId={data.id}
                      quantity={data.quantity}
                      cartIdentifier={cartIdentifier}
                      addFunction={handleQuantityAdding}
                      subFunction={handleQuantitySubtraction}
                      className={
                        "flex justify-between border-2 border-black items-center px-4 py-2 text-xl font-bold bg-white w-[125px] h-[50px] rounded-full"
                      }
                    />
                  </p>
                </ItemsTableRow>
                <ItemsTableRow>
                  <p className="col-span-1 justify-center flex">
                    {formatCurrency(data.totalPrice)}
                  </p>
                </ItemsTableRow>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default CartItemsTable;
