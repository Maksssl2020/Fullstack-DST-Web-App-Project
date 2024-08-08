import axios from "../AxiosConfig";

export const getShoppingCartByIdentifier = async (
  identifier,
  isAuthenticated,
) => {
  try {
    const response = await axios.get(`/shop/carts/${identifier}`, {
      isUserRegistered: isAuthenticated,
    });
    console.log(identifier);
    console.log(response);
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

export const addProductToCartWhenUserIsLogged = async (
  customerUsername,
  productId,
  quantity,
  size,
  isAuthenticated,
) => {
  const formData = new FormData();
  formData.append("quantity", quantity);
  formData.append("isUserRegistered", isAuthenticated);

  if (size !== null) {
    formData.append("size", size);
  }

  try {
    const response = await axios.post(
      `/shop/carts/items/add-item/${customerUsername}/${productId}`,
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
