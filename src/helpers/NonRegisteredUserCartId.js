import { v4 as uuid } from "uuid";

export const generateCartIdentifier = () => {
  return uuid();
};

export const getCartIdForNonRegisterUser = () => {
  let cartId = localStorage.getItem("cartId");

  if (!cartId) {
    saveCartIdInLocalStorage(cartId);
  } else {
    const cartIdTimeStamp = localStorage.getItem("cartIdTimeStamp");
    const currentTime = Date.now();
    const expirationTime = 12 * 60 * 60 * 1000;

    if (currentTime - cartIdTimeStamp > expirationTime) {
      saveCartIdInLocalStorage(cartId);
    }
  }

  return cartId;
};

const saveCartIdInLocalStorage = (cartId) => {
  cartId = generateCartIdentifier();
  localStorage.setItem("cartId", cartId);
  localStorage.setItem("cartIdTimeStamp", Date.now());
};
