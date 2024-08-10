import React from "react";

const CartItemsTableRow = ({
  children,
  columnWidth = "col-span-1",
  className = "justify-center flex",
}) => {
  return <div className={`${columnWidth} ${className}`}>{children}</div>;
};

export default CartItemsTableRow;
