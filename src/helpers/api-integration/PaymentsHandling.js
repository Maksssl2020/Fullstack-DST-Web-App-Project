import axiosConfig from "../AxiosConfig";

export const testPayment = async (data) => {
  try {
    const response = await axiosConfig.post("/payments/payment", data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
