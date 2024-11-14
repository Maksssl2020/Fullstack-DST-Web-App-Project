import React, { useEffect, useState } from "react";
import CloseIcon from "./icons/CloseIcon.jsx";
import ButtonWithLink from "../universal/ButtonWithLink.jsx";
import CartItemCard from "../card/CartItemCard.jsx";
import { formatCurrency } from "../../helpers/CurrencyFormatter.js";
import Spinner from "../universal/Spinner.jsx";
import { AnimatePresence, motion } from "framer-motion";
import { getCartIdForNonRegisterUser } from "../../helpers/NonRegisteredUserCartId.js";
import useCart from "../../hooks/queries/useCart.js";
import useCartItems from "../../hooks/queries/useCartItems.js";
import useAuthentication from "../../hooks/others/useAuthentication.js";
import DrawerContainer from "./DrawerContainer.jsx";

const CartDrawer = ({ isOpen, closeFunction }) => {
  const { userId, isAuthenticated } = useAuthentication();
  const [cartId, setCartId] = useState();
  const [cartIdentifier, setCartIdentifier] = useState("");
  const { cart, fetchingCart } = useCart(cartIdentifier);
  const { cartItems, fetchingCartItems } = useCartItems(cartId, cartIdentifier);

  useEffect(() => {
    if (isAuthenticated) {
      setCartIdentifier(`${userId}`);
    } else {
      setCartIdentifier(getCartIdForNonRegisterUser);
    }
  }, [isAuthenticated, userId]);

  useEffect(() => {
    if (cart && !fetchingCart) {
      setCartId(cart.id);
    }
  }, [cart, fetchingCart]);

  if (fetchingCart || fetchingCartItems) {
    return <Spinner />;
  }

  return (
    <DrawerContainer
      isOpen={isOpen}
      drawerSide={"RIGHT"}
      closeFunction={closeFunction}
    >
      <div className="flex flex-col w-full h-auto mt-6">
        <div
          className={`flex px-4 items-center justify-center gap-4 h-[11.5%] w-full`}
        >
          <motion.button
            whileHover={{ rotate: 180, transition: { duration: 0.3 } }}
            className="rounded-full h-fit ml-auto mr-8"
            onClick={closeFunction}
          >
            <CloseIcon size="size-12" />
          </motion.button>
        </div>
        <h1 className="font-bold text-4xl pl-8">Koszyk</h1>
        <div className="w-full h-auto gap-4 mt-8">
          <AnimatePresence mode={"wait"}>
            {cartItems?.length > 0 ? (
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
                {cartItems?.map((data, index) => (
                  <motion.li
                    key={index}
                    variants={{
                      visible: { x: 0, opacity: 1 },
                      hidden: { x: 100, opacity: 0 },
                    }}
                    transition={{ type: "just", duration: 0.3 }}
                    className={`w-full ${index === 0 && "border-t-4 border-black"}`}
                  >
                    <CartItemCard
                      cartItemData={data}
                      cartIdentifier={cartIdentifier}
                    />
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
            <p>{formatCurrency(cart.totalPrice)}</p>
          </div>
        )}
      </div>
      <div className="w-full h-auto flex flex-col gap-4 mt-8 px-8">
        <ButtonWithLink
          link={`/rainbow-shop/cart/${cartIdentifier}`}
          title={"Zobacz koszyk"}
          className={
            "w-full h-[75px] bg-custom-gray-300 rounded-2xl hover:bg-custom-orange-200 text-white uppercase text-2xl flex justify-center items-center"
          }
          disabled={cartItems?.length === 0}
        />
        <ButtonWithLink
          link={`/rainbow-shop/place-an-order/${cartIdentifier}`}
          title={"kup teraz"}
          className={
            "w-full h-[75px] bg-custom-gray-300 rounded-2xl hover:bg-custom-orange-200 text-white uppercase text-2xl flex justify-center items-center"
          }
          disabled={cartItems?.length === 0}
        />
      </div>
    </DrawerContainer>
  );
};

export default CartDrawer;
