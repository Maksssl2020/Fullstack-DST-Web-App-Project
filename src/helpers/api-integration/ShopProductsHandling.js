import axios from "../AxiosConfig";

export const fetchProductData = async (productId) => {
  try {
    const response = await axios.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductCategoriesData = async (productId) => {
  try {
    const response = await axios.get(`/products/categories/${productId}`);
    return response.data.flatMap((data) => data.category);
  } catch (error) {
    console.log(error);
  }
};
