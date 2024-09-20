import axios from "../AxiosConfig.js";

export const fetchOrderByOrderId = async (orderId) => {
  try {
    const response = await axios.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOrderPurchasedItems = async (orderId) => {
  try {
    const response = await axios.get(`/items/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllOrders = async () => {
  try {
    const response = await axios.get("/orders/find-all");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOrdersByUserId = async (userId) => {
  console.log(userId);

  try {
    const response = await axios.get(`/orders/user-orders/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const handleAddNewOrder = async (orderData) => {
  console.log(orderData);

  console.log(orderData);

  try {
    const response = await axios.post("/orders/save-order", orderData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const handleAddItemsToOrder = async (cartId, orderId) => {
  console.log(cartId);
  console.log(orderId);

  try {
    const response = await axios.post(
      `items/add-items-to-order/${cartId}/${orderId}`,
    );

    console.log("ORDER HANDLING " + response.data);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const handleUpdateOrderStatus = async (orderId, newOrderStatus) => {
  console.log(newOrderStatus);

  try {
    const response = await axios.put(
      `/orders/update-order-status/${orderId}`,
      {
        orderStatus: newOrderStatus,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
