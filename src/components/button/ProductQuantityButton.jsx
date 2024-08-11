import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateProductQuantity } from "../../helpers/api-integration/ShoppingCartHandling";
import Spinner from "../universal/Spinner";

const ProductQuantityButton = ({
  itemId = undefined,
  quantity = undefined,
  addFunction,
  subFunction,
  className,
}) => {
  const queryClient = useQueryClient();

  const {
    mutate: updateCartProductQuantity,
    isLoading: updatingProductQuantity,
  } = useMutation({
    mutationKey: ["updateCartProductQuantity", itemId, quantity],
    mutationFn: (newQuantity) => updateProductQuantity(itemId, newQuantity),
    enabled: itemId !== undefined,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "cartPageItems" });
    },
    onError: (error) => console.log(error),
  });

  if (updatingProductQuantity) {
    return <Spinner />;
  }

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
