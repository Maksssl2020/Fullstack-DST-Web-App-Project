import axios from "../AxiosConfig";

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get("/products/cards");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductData = async (productId) => {
  try {
    const response = await axios.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductDTOData = async (productId) => {
  try {
    const response = await axios.get(`products/cards/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSimilarProducts = async (
  productCategory,
  productsCategoriesData,
  productId,
) => {
  const filteredProducts = productsCategoriesData.filter((item) => {
    return (
      productId.toString() !== item.productId.toString() &&
      productCategory.includes(item.category)
    );
  });

  const productIds =
    filteredProducts.length > 4
      ? filteredProducts.slice(0, 4).map((item) => item.productId)
      : filteredProducts.map((item) => item.productId);

  return await Promise.all(productIds.map((id) => fetchProductDTOData(id)));
};

export const fetchProductImages = async (productId) => {
  try {
    const response = await axios.get(`/products/images/${productId}`);
    return response.data.flatMap((data) => data.image);
  } catch (err) {
    console.error(err);
  }
};

export const fetchAllProductsCategories = async () => {
  try {
    const response = await axios.get("/products/categories");
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

export const fetchProductSizes = async (productId) => {
  try {
    const response = await axios.get(`/products/sizes/${productId}`);
    return response.data.flatMap((productSize) => productSize.size);
  } catch (error) {
    console.log(error);
  }
};
