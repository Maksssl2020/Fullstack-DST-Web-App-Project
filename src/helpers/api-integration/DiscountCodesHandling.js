import axios from "../AxiosConfig";

export const fetchAllDiscountCodes = async () => {
  try {
    const response = await axios.get(`/shop/discount-codes`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDiscountCode = async (discountCode) => {
  try {
    const response = await axios.get(`/shop/discount-codes/${discountCode}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const applyNonGlobalDiscountCode = async (discountCode) => {
  try {
    const response = await axios.get(
      `/shop/discount-codes/${discountCode}/apply-non-global-discount`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const applyGlobalDiscountCode = async (discountCode, userId) => {
  console.log(discountCode);
  console.log(userId);

  try {
    const response = await axios.get(
      `/shop/discount-codes/${discountCode}/${userId}/apply-global-discount`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const generateRandomDiscountCode = async () => {
  try {
    const response = await axios.get(
      `/shop/discount-codes/generate-discount-code`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const isEnteredCodeUnique = async (enteredCode) => {
  try {
    const response = await axios.get(
      `/shop/discount-codes/is-entered-code-unique`,
      {
        params: {
          code: enteredCode,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleAddNewDiscountCode = async (discountCodeData) => {
  console.log(discountCodeData);
  try {
    const response = await axios.post(
      "/shop/discount-codes/add-discount-code",
      discountCodeData,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteDiscountCode = async (discountCodeId) => {
  try {
    const response = await axios.delete(
      `/shop/discount-codes/${discountCodeId}/delete`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
