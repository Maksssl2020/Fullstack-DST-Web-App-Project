import axios from "../AxiosConfig";

export const getShoppingCartByUsername = async (username) => {
  try {
    const response = await axios.get(`/shop/carts/${username}`);
    console.log(username);
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

export const addProductToCart = async (productId, cartId) => {};
