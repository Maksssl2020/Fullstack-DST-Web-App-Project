import customAxios from "../AxiosConfig.js";
import axios from "axios";

export const fetchShoppingCartByIdentifier = async (
  identifier: string,
  isAuthenticated: boolean,
) => {
  console.log(identifier);

  try {
    const response = await customAxios.get(`/shop/carts/${identifier}`, {
      params: { userRegistered: isAuthenticated },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

export const fetchShoppingCartId = async (
  cartIdentifier: string,
  isAuthenticated: boolean,
) => {
  console.log(cartIdentifier);

  try {
    const response = await customAxios.get(`/shop/carts/${cartIdentifier}/id`, {
      params: { userRegistered: isAuthenticated },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

export const getShoppingCartItems = async (cartId: number) => {
  try {
    const response = await customAxios.get(`/items/cart/${cartId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

export const getShoppingCartAmountOfItems = async (cartId: number) => {
  try {
    const response = await customAxios.get(`/items/amount-of-items/${cartId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

export const addProductToCart = async (
  cartIdentifier,
  productId,
  quantity,
  size,
  isAuthenticated,
) => {
  const formData = new FormData();
  formData.append("quantity", quantity);
  formData.append("userRegistered", isAuthenticated);

  if (size !== null) {
    formData.append("size", size);
  }

  try {
    const response = await customAxios.post(
      `/items/add-item/${cartIdentifier}/${productId}`,
      formData,
      {
        headers: "Content-Type/multipart/form-data",
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

export const updateProductQuantity = async (
  cartItemId: number,
  quantity: number,
) => {
  const formData = new FormData();
  formData.append("quantity", quantity.toString());

  try {
    const response = await customAxios.put(
      `/items/change-quantity/${cartItemId}`,
      formData,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

export const deleteProductFromCart = async (
  cartItemId: number,
  cartId: number,
) => {
  try {
    const response = await customAxios.delete(
      `/items/delete-item/${cartItemId}/${cartId}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

export const deleteAllProductsFromCart = async (cartId: number) => {
  try {
    const response = await customAxios.delete(
      `/items/delete-all-items/${cartId}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};
