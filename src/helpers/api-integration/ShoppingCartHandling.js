import axios from "../AxiosConfig";

export const getShoppingCartByIdentifier = async (
  identifier,
  isAuthenticated,
) => {
  try {
    const response = await axios.get(`/shop/carts/${identifier}`, {
      params: { userRegistered: isAuthenticated },
    });
    console.log(identifier);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getShoppingCartId = async (cartIdentifier) => {
  try {
    const response = await axios.get(`/shop/carts/${cartIdentifier}/id`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getShoppingCartItems = async (cartId) => {
  try {
    const response = await axios.get(`/shop/carts/items/${cartId}`);
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
      `/shop/carts/items/add-item/${cartIdentifier}/${productId}`,
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

export const deleteProductFromCart = async (cartItemId) => {
  try {
    const response = await axios.delete(
      `/shop/carts/items/delete-item/${cartItemId}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
