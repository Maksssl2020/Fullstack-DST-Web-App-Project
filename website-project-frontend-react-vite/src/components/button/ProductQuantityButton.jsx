import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateProductQuantity } from "../../helpers/api-integration/ShoppingCartHandling.js";
import Spinner from "../universal/Spinner.jsx";

const ProductQuantityButton = ({
  itemId = undefined,
  quantity = undefined,
  addFunction,
  subFunction,
  className,
}) => {
  const queryClient = useQueryClient();

  console.log(itemId);

  const {
    mutate: updateCartProductQuantity,
    isLoading: updatingProductQuantity,
  } = useMutation({
    mutationKey: ["updateCartProductQuantity", itemId, quantity],
    mutationFn: (newQuantity) => {
      if (itemId) {
        return updateProductQuantity(itemId, newQuantity);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("cartTableData");
      queryClient.invalidateQueries("userCartData");
    },
    onError: (error) => console.log(error),
  });

  const handleSubtract = () => {
    if (itemId && quantity - 1 >= 1) {
      const newQuantity = subFunction(quantity);
      updateCartProductQuantity(newQuantity);
    } else {
      subFunction();
    }
  };

  const handleAdd = () => {
    if (itemId) {
      const newQuantity = addFunction(quantity);
      updateCartProductQuantity(newQuantity);
    } else {
      addFunction();
    }
  };

  // if (updatingProductQuantity) {
  //   return;
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
