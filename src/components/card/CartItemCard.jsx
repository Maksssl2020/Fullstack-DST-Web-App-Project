import React from "react";
import CloseIcon from "../drawer/icons/CloseIcon";

const CartItemCard = ({ cartItemData }) => {
  const { productFullTitle, productSize, quantity, unitPrice, mainImage } =
    cartItemData;

  return (
    <div className="w-full flex items-center border-4 border-black rounded-2xl pr-2">
      <div className="size-[125px] rounded-l-2xl flex items-center justify-center rounded-2xl">
        <img
          className="size-full inset-0 object-cover self-center"
          src={mainImage}
          alt={productFullTitle}
        />
      </div>
      <div className="w-auto h-[125px] p-2 flex flex-col">
        <p className="text-lg">{`${productFullTitle} ${productSize && productSize}`}</p>
        <p className="text-[20px]">{`${quantity} x ${unitPrice}`}</p>
      </div>
      <button className="size-10 ml-auto bg-white rounded-full justify-center items-center flex">
        <CloseIcon size={"size-10"} />
      </button>
    </div>
  );
};

export default CartItemCard;
