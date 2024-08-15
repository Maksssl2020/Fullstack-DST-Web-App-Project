import axios from "../AxiosConfig";

export const fetchUserNotifications = async (userId) => {
  try {
    const response = await axios.get(`/notifications/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAmountOfNonReadUserNotifications = async (userId) => {
  try {
    const response = await axios.get(
      `/notifications/amount-of-non-read-notifications/${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const sendNewNotification = async (notificationData) => {
  try {
    const response = await axios.post(
      "/notifications/add-notification",
      notificationData,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await axios.put(
      `/notifications/${notificationId}/is-read`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
