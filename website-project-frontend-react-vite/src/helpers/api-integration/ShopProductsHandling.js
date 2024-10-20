import axios from "../AxiosConfig.js";

export const fetchAllProducts = async (chosenCategory) => {
  try {
    const response = await axios.get("/products/cards", {
      params: {
        category: chosenCategory,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductData = async (productId) => {
  console.log(productId);

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
  productCategories,
  productsCategoriesData,
  productId,
) => {
  const filteredProducts = productsCategoriesData?.filter((item) => {
    return (
      productId.toString() !== item.productId.toString() &&
      productCategories.includes(item.category)
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

export const fetchProductsOfEachCategory = async () => {
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

export const handleAddNewProduct = async (productData, productType) => {
  console.log(productData);

  try {
    const response = await axios.post(
      `/products/${productType}/add`,
      productData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleUpdateProduct = async (
  productId,
  productData,
  productType,
) => {
  try {
    const response = await axios.put(
      `/products/${productType}/update/${productId}`,
      productData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleDeleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`/products/delete/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
