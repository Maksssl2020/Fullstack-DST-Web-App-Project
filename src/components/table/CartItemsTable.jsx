import React from "react";
import DefaultModal from "../modal/DefaultModal";
import ButtonWithLink from "../universal/ButtonWithLink";
import { AnimatePresence, motion } from "framer-motion";
import ItemsTableRow from "./ItemsTableRow";
import AnimatedCancelButton from "../universal/AnimatedCancelButton";
import { formatCurrency } from "../../helpers/CurrencyFormatter";
import ProductQuantityButton from "../button/ProductQuantityButton";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteProductFromCart,
  getShoppingCartItems,
} from "../../helpers/api-integration/ShoppingCartHandling";
import toast from "react-hot-toast";
import Spinner from "../universal/Spinner";

const CartItemsTable = ({ cartId }) => {
  const queryClient = useQueryClient();

  const { data: cartItemsData, isLoading: fetchingCartItemsData } = useQuery(
    ["cartTableData", cartId],
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

  if (fetchingCartItemsData || deletingItemFromCart) {
    return <Spinner />;
  }

  return (
    <>
      {cartItemsData?.length === 0 && (
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
            {cartItemsData?.map((data) => (
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
                    onClick={() => deleteItemFromCart(data.id)}
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
