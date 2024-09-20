import axios from "../AxiosConfig.js";

export const handleProcessPayment = async (paymentData) => {
  console.log(paymentData);

  try {
    const response = await axios.post("/payments/payment", paymentData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
