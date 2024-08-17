import axios from "../AxiosConfig";

export const fetchEventsData = async () => {
  try {
    const response = await axios.get("/events");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAmountOfVolunteersInEvent = async (eventId) => {
  try {
    const response = await axios.get(`/events/${eventId}/count-volunteers`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAmountOfBasicUsersInEvent = async (eventId) => {
  try {
    const response = await axios.get(`/events/${eventId}/count-basic-users`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserIsRegisteredInTheEvent = async (eventId, userId) => {
  try {
    const response = await axios.get(
      `/events/${eventId}/user-registered-to-the-event/${userId}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllUserEvents = async (userId) => {
  try {
    const response = await axios.get(`/events/user-events/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const handleAddNewEvent = async (eventData) => {
  try {
    const response = await axios.post("/events/add-event", eventData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const handleAddUserToTheEvent = async (eventId, userId) => {
  try {
    const response = await axios.post(`/events/${eventId}/add-user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
