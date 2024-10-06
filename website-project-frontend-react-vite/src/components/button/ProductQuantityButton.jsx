import React from "react";
import useUpdateCartItemQuantity from "../../hooks/mutations/useUpdateCartItemQuantity.js";
import Spinner from "../universal/Spinner.jsx";

const ProductQuantityButton = ({
  itemId = undefined,
  quantity = undefined,
  cartIdentifier = undefined,
  addFunction,
  subFunction,
  className,
}) => {
  const { updateCartItemQuantity, updatingCartItemQuantity } =
    useUpdateCartItemQuantity(itemId, cartIdentifier);

  const handleSubtract = () => {
    if (itemId && quantity - 1 >= 1) {
      const newQuantity = subFunction(quantity);
      updateCartItemQuantity(newQuantity);
    } else {
      subFunction();
    }
  };

  const handleAdd = () => {
    if (itemId) {
      const newQuantity = addFunction(quantity);
      updateCartItemQuantity(newQuantity);
    } else {
      addFunction();
    }
  };

  // if (updatingCartItemQuantity) {
  //   return <Spinner />;
  // }

  return (
    <div className={className}>
      <button onClick={handleSubtract} className="w-[35px] h-full">
        -
      </button>
      <p className="italic">{quantity}</p>
      <button onClick={handleAdd} className="w-[35px] h-full">
        +
      </button>
    </div>
  );
};

export default ProductQuantityButton;
