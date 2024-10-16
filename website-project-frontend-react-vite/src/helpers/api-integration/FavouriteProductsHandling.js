import axios from "../AxiosConfig.js";

export const fetchAllUserFavouriteProducts = async (userId) => {
  try {
    const response = await axios.get(`/favourite-items/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllUserProductsMarkedAsFavourite = async (userId) => {
  try {
    const response = await axios.get(
      `/favourite-items/${userId}/find-all-marked-products-id"`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const saveUserFavouriteProduct = async (
  userId,
  mainProductId,
  productSize,
) => {
  const productFormData = new FormData();
  productFormData.append("mainProductId", mainProductId);
  productFormData.append("userId", userId);

  console.log(mainProductId);
  console.log(userId);
  console.log(productSize);

  if (productSize) {
    productFormData.append("productSize", productSize);
  }

  try {
    const response = await axios.post(
      "/favourite-items/save",
      productFormData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUserFavouriteProduct = async (favouriteProductId) => {
  try {
    const response = await axios.delete(
      `/favourite-items/delete/${favouriteProductId}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
