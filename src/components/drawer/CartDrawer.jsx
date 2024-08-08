import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "./icons/CloseIcon";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import ButtonWithLink from "../universal/ButtonWithLink";
import { useQuery } from "react-query";
import {
  getShoppingCartByIdentifier,
  getShoppingCartItems,
} from "../../helpers/api-integration/ShoppingCartHandling";
import CartItemCard from "../card/CartItemCard";
import { formatCurrency } from "../../helpers/CurrencyFormatter";
import Spinner from "../universal/Spinner";

const CartDrawer = ({ isOpen, closeFunction }) => {
  const { username, isAuthenticated } = useContext(AuthContext);
  const [cartId, setCartId] = useState();
  const { data: authenticatedCustomerCart, isLoading: searchingCart } =
    useQuery(
      ["authenticatedCustomerCart", username, isAuthenticated],
      () => getShoppingCartByIdentifier(username, isAuthenticated),
      {
        enabled: isAuthenticated === true && isOpen === true,
      },
    );

  console.log(authenticatedCustomerCart);

  useEffect(() => {
    if (authenticatedCustomerCart) {
      setCartId(authenticatedCustomerCart.id);
    }
  }, [authenticatedCustomerCart]);

  const { data: cartItems, isLoading: searchingCartItems } = useQuery(
    ["cartItems", cartId],
    () => getShoppingCartItems(cartId),
    { enabled: isOpen === true },
  );
  const navigate = useNavigate();

  console.log(cartItems);

  const totalItemsPrice = cartItems?.reduce((accumulator, item) => {
    return accumulator + Number.parseFloat(item.totalPrice);
  }, 0);

  if (searchingCart || searchingCartItems) {
    return <Spinner />;
  }

  return (
    <div className="transition-all duration-300 ease-in-out">
      {isOpen && (
        <div
          onClick={closeFunction}
          className="fixed inset-0 z-30 bg-black bg-opacity-40 backdrop-blur-sm"
        ></div>
      )}

      <div
        className={`font-lato flex-col right-0 top-0 flex z-30 overflow-y-auto transition-transform fixed h-screen w-[490px] bg-custom-gray-200 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col items-center w-full px-8 py-14">
          <button
            className="rounded-full h-fit ml-auto"
            onClick={closeFunction}
          >
            <CloseIcon size="size-12" />
          </button>
          <div className="flex flex-col w-full h-auto mt-6">
            <h1 className="font-bold text-4xl">Koszyk</h1>
            <div className="w-full h-auto gap-4 mt-8">
              {cartItems && cartItems.length > 0 ? (
                <div className="gap-4 flex flex-col">
                  {cartItems.map((data, index) => (
                    <CartItemCard cartItemData={data} key={index} />
                  ))}
                </div>
              ) : (
                <h3 className="w-full text-2xl font-bold text-center my-8">
                  Bark produktów w koszyku
                </h3>
              )}
            </div>
            {cartItems && cartItems.length > 0 && (
              <div className="w-full h-auto flex text-lg px-2 justify-between mt-4">
                <p>Kwota:</p>
                <p>{formatCurrency(totalItemsPrice)}</p>
              </div>
            )}
          </div>
          <div className="w-full h-auto flex flex-col px-2 gap-4 mt-8">
            <ButtonWithLink
              link={""}
              title={"Zobacz koszyk"}
              styling={
                "w-full h-[75px] bg-custom-gray-300 rounded-2xl hover:bg-custom-orange-200 text-white uppercase text-2xl flex justify-center items-center"
              }
              closeModal={undefined}
            />
            <ButtonWithLink
              link={""}
              title={"kup teraz"}
              styling={
                "w-full h-[75px] bg-custom-gray-300 rounded-2xl hover:bg-custom-orange-200 text-white uppercase text-2xl flex justify-center items-center"
              }
              closeModal={undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
