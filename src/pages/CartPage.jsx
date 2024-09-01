import React, { useContext, useState } from "react";
import AnimatedPage from "../animation/AnimatedPage";
import MainBannerWithoutLogo from "../components/universal/MainBannerWithoutLogo";
import { useParams } from "react-router-dom";
import ButtonWithLink from "../components/universal/ButtonWithLink";
import CheckIcon from "../icons/CheckIcon";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteAllProductsFromCart,
  fetchShoppingCartByIdentifier,
} from "../helpers/api-integration/ShoppingCartHandling";
import toast from "react-hot-toast";
import Spinner from "../components/universal/Spinner";
import { AuthContext } from "../helpers/provider/AuthProvider";
import { formatCurrency } from "../helpers/CurrencyFormatter";
import { useForm } from "react-hook-form";
import {
  handleAssignDiscountCodeToCart,
  isDiscountCodeStillValid,
} from "../helpers/api-integration/DiscountCodesHandling";
import { calcCartTotalPriceWithDiscount } from "../helpers/ApplyDiscountCodes";
import CartItemsTable from "../components/table/CartItemsTable";

const CartPage = () => {
  const { userId, isAuthenticated } = useContext(AuthContext);
  const { identifier } = useParams();
  const {
    register,
    getValues,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();

  const { data: cartData, isLoading: fetchingCartData } = useQuery(
    ["userCartData", identifier, isAuthenticated],
    () => fetchShoppingCartByIdentifier(identifier, isAuthenticated),
  );

  const {
    mutate: deleteAllItemsFromCart,
    isLoading: deletingAllItemsFromCart,
  } = useMutation({
    mutationKey: ["deleteAllItemsFromCart", cartData?.id],
    mutationFn: () => deleteAllProductsFromCart(cartData?.id),
    onSuccess: () => {
      queryClient.invalidateQueries("cartPageItems");
      queryClient.invalidateQueries("amountOfItemsInCart");
      toast.success("Usunięto wszystkie produkty z koszyka!");
    },
    onError: (error) => console.log(error),
  });

  const { mutate: assignDiscountCodeToCart, isLoading: assigningDiscountCode } =
    useMutation({
      mutationKey: ["assignDiscountCodeToCart", getValues().discountCode],
      mutationFn: async () => {
        const discountCode = getValues().discountCode;

        if (!discountCode) {
          throw new Error("Kod rabatowy jest wymagany!");
        }

        const isValid = await isDiscountCodeStillValid(
          getValues().discountCode,
        );

        if (!isValid) {
          throw new Error("Ten kod rabatowy jest nieważny lub wygasł.");
        }

        return handleAssignDiscountCodeToCart(
          cartData.cartIdentifier,
          getValues().discountCode,
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries("userCartData");
        toast.success(
          `Dodano kod zniżkowy do koszyka: ${getValues().discountCode}!`,
        );
        reset();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

  if (fetchingCartData || deletingAllItemsFromCart || assigningDiscountCode) {
    return <Spinner />;
  }

  console.log(cartData);
  console.log(userId);

  return (
    <AnimatedPage>
      <div className="w-full gap-8 h-auto font-lato flex py-8 flex-col items-center bg-custom-gray-400">
        <MainBannerWithoutLogo bannerTitle={"Koszyk"} />
        <div className="w-[1350px] h-auto flex flex-col gap-4 items-center py-8 px-12 bg-custom-gray-100 rounded-2xl">
          <div className="w-[90%] h-[100px] relative px-8 bg-custom-gray-300 rounded-2xl text-2xl flex justify-center items-center">
            <div className="absolute left-4 flex items-center rounded-full bg-custom-orange-200">
              <CheckIcon size={"size-10 text-white"} />
            </div>
            <p>Strefa wysyłkowa dopasowana do klienta: &nbsp; "Polska"</p>
          </div>
          <CartItemsTable cartId={cartData?.id} />
          <div className="w-[90%] mt-12 flex justify-between">
            <ButtonWithLink
              link={"/rainbow-shop"}
              title={"Kontynuuj zakupy"}
              className={
                "h-[75px] rounded-2xl flex items-center justify-center w-[350px] uppercase font-bold text-2xl bg-custom-gray-300 hover:bg-custom-orange-200 hover:text-white"
              }
            />
            <div className="w-[550px] h-[75px] flex justify-between text-white text-xl">
              <button
                onClick={deleteAllItemsFromCart}
                className="w-[48%] h-full bg-custom-gray-300 rounded-2xl uppercase hover:bg-custom-orange-200"
              >
                wyczyść
              </button>
              <button className="w-[48%] h-full bg-custom-gray-300 rounded-2xl uppercase hover:bg-custom-orange-200">
                odśwież
              </button>
            </div>
          </div>
          <div className="mt-6 flex w-[90%]">
            <div className="flex flex-col w-[35%] h-auto mr-auto gap-3">
              <h3 className="font-bold text-2xl">Kod rabatowy</h3>
              <p className="text-xl">Masz kod rabatowy? Wpisz go tutaj.</p>
              <input
                placeholder={"Wpisz kod rabatowy"}
                className={
                  "w-full h-[50px] rounded-2xl focus:outline-custom-orange-200  border-2 border-black px-4 placeholder:text-black text-black"
                }
                {...register("discountCode", {
                  required: true,
                })}
              />
              <button
                onClick={handleSubmit(assignDiscountCodeToCart)}
                className="ml-auto font-bold text-xl border-b-2 border-custom-orange-200"
              >
                Aktywuj kod
              </button>
              <h3 className="font-bold text-2xl">Karta podarunkowa</h3>
              <p className="text-xl">
                Posiadasz kartę podarunkową? Podaj jej numer.
              </p>
              <input
                placeholder={"Numer karty podarunkowej"}
                className="w-full h-[50px] rounded-2xl border-2 focus:outline-custom-orange-200 border-black px-4 placeholder:text-black text-black"
              />
              <button className="ml-auto font-bold text-xl border-b-2 border-custom-orange-200">
                Zastosuj
              </button>
            </div>
            <div className="ml-auto w-[42%]">
              <h3 className="font-bold text-2xl">Podsumowanie koszyka</h3>
              <div
                className={
                  "w-full h-auto p-4 bg-custom-gray-300 text-xl rounded-2xl grid grid-cols-2 "
                }
              >
                <div className="col-span-1 uppercase grid grid-rows-3 gap-4">
                  <p className="row-span-1">Suma:</p>
                  <p className="row-span-1">Zniżka:</p>
                  <p className="row-span-1">Łącznie:</p>
                </div>
                <div className="ml-auto col-span-1 uppercase grid grid-rows-3 gap-4">
                  <p className="row-span-1">
                    {formatCurrency(cartData.totalPrice)}
                  </p>
                  {cartData.discountCode ? (
                    <p className="row-span-1">{`${cartData.discountCode.discountType === "FIXED_AMOUNT" ? formatCurrency(cartData.discountCode.discountValue) : `${cartData.discountCode.discountValue} %`}`}</p>
                  ) : (
                    <p className="row-span-1">BRAK</p>
                  )}
                  {cartData.discountCode ? (
                    <p className="row-span-1">
                      {calcCartTotalPriceWithDiscount(
                        cartData.discountCode,
                        cartData.totalPrice,
                      )}
                    </p>
                  ) : (
                    <p className="row-span-1">
                      {formatCurrency(cartData.totalPrice)}
                    </p>
                  )}
                </div>
              </div>
              <ButtonWithLink
                link={`/rainbow-shop/place-an-order/${identifier}`}
                title={"Przejdź do płatności"}
                className={
                  "h-[75px] ml-auto mt-8 rounded-2xl flex items-center justify-center w-[350px] uppercase font-bold text-2xl bg-custom-gray-300 hover:bg-custom-orange-200 hover:text-white"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default CartPage;
