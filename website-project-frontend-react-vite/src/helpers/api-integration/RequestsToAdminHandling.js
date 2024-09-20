import axios from "../AxiosConfig.js";

export const fetchAllUsersRequests = async () => {
  try {
    const response = await axios.get("/requests-to-admin/find-all");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleSendingNewRequest = async (requestData) => {
  try {
    const response = await axios.post(
      "/requests-to-admin/create-request",
      requestData,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const handleAcceptRequestToAdmin = async (requestId) => {
  try {
    const response = await axios.put(
      `/requests-to-admin/accept-request/${requestId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleDeleteRequestToAdmin = async (requestId) => {
  try {
    const response = await axios.delete(
      `/requests-to-admin/delete-request/${requestId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
