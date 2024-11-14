import axios from "../AxiosConfig.js";

export const fetchShoppingCartByIdentifier = async (
  identifier,
  isAuthenticated,
) => {
  console.log(identifier);

  try {
    const response = await axios.get(`/shop/carts/${identifier}`, {
      params: { userRegistered: isAuthenticated },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchShoppingCartId = async (cartIdentifier, isAuthenticated) => {
  console.log(cartIdentifier);

  try {
    const response = await axios.get(`/shop/carts/${cartIdentifier}/id`, {
      params: { userRegistered: isAuthenticated },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getShoppingCartItems = async (cartId) => {
  try {
    const response = await axios.get(`/items/cart/${cartId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getShoppingCartAmountOfItems = async (cartId) => {
  try {
    const response = await axios.get(`/items/amount-of-items/${cartId}`);
    return response.data;
  } catch (error) {
    console.log(error);
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
    const response = await axios.post(
      `/items/add-item/${cartIdentifier}/${productId}`,
      formData,
      {
        headers: "Content-Type/multipart/form-data",
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProductQuantity = async (cartItemId, quantity) => {
  const formData = new FormData();
  formData.append("quantity", quantity);

  try {
    const response = await axios.put(
      `/items/change-quantity/${cartItemId}`,
      formData,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductFromCart = async (cartItemId, cartId) => {
  try {
    const response = await axios.delete(
      `/items/delete-item/${cartItemId}/${cartId}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllProductsFromCart = async (cartId) => {
  try {
    const response = await axios.delete(`/items/delete-all-items/${cartId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
