import React from "react";
import CloseIcon from "../drawer/icons/CloseIcon";
import { formatCurrency } from "../../helpers/CurrencyFormatter";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import Spinner from "../universal/Spinner";
import { deleteProductFromCart } from "../../helpers/api-integration/ShoppingCartHandling";
import { motion } from "framer-motion";

const CartItemCard = ({ cartItemData }) => {
  const { id, productFullTitle, productSize, quantity, unitPrice, mainImage } =
    cartItemData;
  const queryClient = useQueryClient();

  const { mutate: deleteItemFromCart, isLoading: deletingItemFromCart } =
    useMutation({
      mutationKey: ["deleteItemFromCart", id],
      mutationFn: () => deleteProductFromCart(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: "cartItems" });
        toast.success("Przedmiot został usunięty z koszyka!", {
          position: "top-center",
        });
      },
      onError: (error) => console.log(error),
    });

  if (deletingItemFromCart) {
    return <Spinner />;
  }

  return (
    <div className="w-full flex font-semibold items-center bg-white pr-2 border-b-4 border-black">
      <div className="size-[125px] flex items-center justify-center">
        <img
          className="size-full inset-0 object-cover self-center"
          src={`data:image/png;base64,${mainImage}`}
          alt={productFullTitle}
        />
      </div>
      <div className="w-auto h-[125px] px-6 py-2 flex flex-col">
        <p className="text-lg">{`${productFullTitle} ${productSize !== null ? productSize : ""}`}</p>
        <p className="text-[20px]">{`${quantity} x ${formatCurrency(unitPrice)}`}</p>
      </div>
      <motion.button
        whileHover={{ rotate: 180 }}
        transition={{ duration: 0.3 }}
        onClick={deleteItemFromCart}
        className="size-10 ml-auto rounded-full justify-center items-center flex"
      >
        <CloseIcon size={"size-10"} />
      </motion.button>
    </div>
  );
};

export default CartItemCard;
