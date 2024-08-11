import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "./icons/CloseIcon";
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
import { AnimatePresence, motion } from "framer-motion";
import { getCartIdForNonRegisterUser } from "../../helpers/NonRegisteredUserCartId";

const CartDrawer = ({ isOpen, closeFunction }) => {
  const { username, isAuthenticated } = useContext(AuthContext);
  const [cartId, setCartId] = useState();
  const [cartIdentifier, setCartIdentifier] = useState();

  useEffect(() => {
    if (isAuthenticated) {
      setCartIdentifier(username);
    } else {
      setCartIdentifier(getCartIdForNonRegisterUser);
    }
  }, [isAuthenticated, username]);

  const { data: customerCart, isLoading: searchingCart } = useQuery(
    ["authenticatedCustomerCart", cartIdentifier, isAuthenticated],
    () => getShoppingCartByIdentifier(cartIdentifier, isAuthenticated),
    {
      enabled: isOpen === true,
    },
  );

  useEffect(() => {
    if (customerCart) {
      setCartId(customerCart.id);
    }
  }, [customerCart]);

  const { data: cartItems, isLoading: searchingCartItems } = useQuery(
    ["cartItems", cartId],
    () => getShoppingCartItems(cartId),
    { enabled: isOpen === true },
  );

  console.log(cartItems);
  console.log(cartIdentifier);

  const totalItemsPrice = cartItems?.reduce((accumulator, item) => {
    return accumulator + Number.parseFloat(item.totalPrice);
  }, 0);

  if (searchingCart || searchingCartItems) {
    return <Spinner />;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, type: "spring" }}
            onClick={closeFunction}
            className="fixed inset-0 z-30 bg-black bg-opacity-40 backdrop-blur-sm"
          ></motion.div>

          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.2, type: "just" }}
            className="font-lato flex-col right-0 top-0 flex z-30 fixed h-screen w-[490px] bg-custom-gray-200"
          >
            <div className="flex flex-col items-center w-full py-14">
              <motion.button
                whileHover={{ rotate: 180, transition: { duration: 0.3 } }}
                className="rounded-full h-fit ml-auto mr-8"
                onClick={closeFunction}
              >
                <CloseIcon size="size-12" />
              </motion.button>
              <div className="flex flex-col w-full h-auto mt-6">
                <h1 className="font-bold text-4xl pl-8">Koszyk</h1>
                <div className="w-full h-auto gap-4 mt-8">
                  <AnimatePresence mode={"wait"}>
                    {cartItems && cartItems.length > 0 ? (
                      <motion.ul
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                          visible: {
                            transition: {
                              staggerChildren: 0.05,
                            },
                          },
                          hidden: {},
                        }}
                        key={"list"}
                        className="flex flex-col w-full"
                      >
                        {cartItems.map((data, index) => (
                          <motion.li
                            key={index}
                            variants={{
                              visible: { x: 0, opacity: 1 },
                              hidden: { x: 100, opacity: 0 },
                            }}
                            transition={{ type: "just", duration: 0.3 }}
                            className={`w-full ${index === 0 && "border-t-4 border-black"}`}
                          >
                            <CartItemCard cartItemData={data} />
                          </motion.li>
                        ))}
                      </motion.ul>
                    ) : (
                      <motion.h3
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full text-2xl font-bold text-center my-8"
                      >
                        Brak produktów w koszyku
                      </motion.h3>
                    )}
                  </AnimatePresence>
                </div>
                {cartItems && cartItems.length > 0 && (
                  <div className="w-full font-semibold h-auto flex text-lg justify-between mt-4 px-8">
                    <p>Kwota:</p>
                    <p>{formatCurrency(totalItemsPrice)}</p>
                  </div>
                )}
              </div>
              <div className="w-full h-auto flex flex-col gap-4 mt-8 px-8">
                <ButtonWithLink
                  link={`/rainbow-shop/cart/${customerCart.cartIdentifier}`}
                  title={"Zobacz koszyk"}
                  className={
                    "w-full h-[75px] bg-custom-gray-300 rounded-2xl hover:bg-custom-orange-200 text-white uppercase text-2xl flex justify-center items-center"
                  }
                />
                <ButtonWithLink
                  link={""}
                  title={"kup teraz"}
                  className={
                    "w-full h-[75px] bg-custom-gray-300 rounded-2xl hover:bg-custom-orange-200 text-white uppercase text-2xl flex justify-center items-center"
                  }
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
