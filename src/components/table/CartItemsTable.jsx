import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteProductFromCart,
  getShoppingCartId,
  getShoppingCartItems,
} from "../../helpers/api-integration/ShoppingCartHandling";
import Spinner from "../universal/Spinner";
import { formatCurrency } from "../../helpers/CurrencyFormatter";
import AnimatedCancelButton from "../universal/AnimatedCancelButton";
import CartItemsTableRow from "./CartItemsTableRow";
import DefaultModal from "../modal/DefaultModal";
import ButtonWithLink from "../universal/ButtonWithLink";
import ProductQuantityButton from "../button/ProductQuantityButton";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

const CartItemsTable = ({ cartIdentifier }) => {
  const queryClient = useQueryClient();

  const { data: cartId, isLoading: fetchingCartId } = useQuery(
    ["cartPageData", cartIdentifier],
    () => getShoppingCartId(cartIdentifier),
  );

  const { data: cartItems, isLoading: fetchingCartItems } = useQuery(
    ["cartPageItems", cartId],
    () => getShoppingCartItems(cartId),
  );

  const { mutate: deleteItemFromCart, isLoading: deletingItemFromCart } =
    useMutation({
      mutationKey: ["deleteItemFromCart"],
      mutationFn: (itemId) => deleteProductFromCart(itemId),
      onSuccess: () => {
        queryClient.invalidateQueries("cartPageItems");
        queryClient.invalidateQueries("amountOfItemsInCart");
        toast.success("Usunięto produkt z koszyka!");
      },
      onError: (error) => console.log(error),
    });

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

  if (fetchingCartId || fetchingCartItems) {
    return <Spinner />;
  }

  return (
    <>
      {cartItems.length === 0 && (
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

      <div className="w-[90%] h-auto rounded-2xl text-2xl">
        <div className=" w-full h-[100px] bg-custom-gray-300 rounded-2xl grid grid-cols-6 items-center text-2xl ">
          <p className="col-span-1 justify-center flex" />
          <p className="col-span-2 flex">Produkt:</p>
          <p className="col-span-1 justify-center flex">Cena:</p>
          <p className="col-span-1 justify-center flex">Ilosc:</p>
          <p className="col-span-1 justify-center flex">Kwota:</p>
        </div>
        <div className="w-full h-auto rounded-2xl text-2xl">
          <AnimatePresence mode={"popLayout"}>
            {cartItems.map((data) => (
              <motion.div
                layout
                key={data.id}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                className="border-b-4 border-custom-gray-300 grid grid-cols-6 items-center pb-4 mt-4"
              >
                <CartItemsTableRow
                  columnWidth={"col-span-3"}
                  className={"items-center flex gap-8"}
                >
                  <AnimatedCancelButton
                    onClick={() => deleteItemFromCart(data.id)}
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
                    <ProductQuantityButton
                      itemId={data.id}
                      quantity={data.quantity}
                      addFunction={handleQuantityAdding}
                      subFunction={handleQuantitySubtraction}
                      className={
                        "flex justify-between border-2 border-black items-center px-4 py-2 text-xl font-bold bg-white w-[125px] h-[50px] rounded-full"
                      }
                    />
                  </p>
                </CartItemsTableRow>
                <CartItemsTableRow>
                  <p className="col-span-1 justify-center flex">
                    {formatCurrency(data.totalPrice)}
                  </p>
                </CartItemsTableRow>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default CartItemsTable;
