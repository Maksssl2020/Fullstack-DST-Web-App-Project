import React from "react";
import CloseIcon from "../drawer/icons/CloseIcon";
import { formatCurrency } from "../../helpers/CurrencyFormatter";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import Spinner from "../universal/Spinner";
import { deleteProductFromCart } from "../../helpers/api-integration/ShoppingCartHandling";

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
    <div className="w-full flex items-center border-4 border-black rounded-2xl pr-2">
      <div className="size-[125px] rounded-l-2xl flex items-center justify-center rounded-2xl">
        <img
          className="size-full inset-0 object-cover self-center rounded-l-2xl"
          src={`data:image/png;base64,${mainImage}`}
          alt={productFullTitle}
        />
      </div>
      <div className="w-auto h-[125px] p-2 flex flex-col">
        <p className="text-lg">{`${productFullTitle} ${productSize !== null ? productSize : ""}`}</p>
        <p className="text-[20px]">{`${quantity} x ${formatCurrency(unitPrice)}`}</p>
      </div>
      <button
        onClick={deleteItemFromCart}
        className="size-10 ml-auto bg-white rounded-full justify-center items-center flex"
      >
        <CloseIcon size={"size-10"} />
      </button>
    </div>
  );
};

export default CartItemCard;
