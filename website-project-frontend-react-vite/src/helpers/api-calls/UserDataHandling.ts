import axios from "../AxiosConfig.js";
import { UserDisplay } from "../../models/UserDisplay";

export const checkUsernameIsUnique = async (username) => {
  console.log(username);

  try {
    const response = await axios.get("/users/is-username-unique", {
      params: {
        username: username,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const checkEmailIsUnique = async (email) => {
  try {
    const response = await axios.get("/users/is-email-unique", {
      params: {
        email: email,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllUsers = async (filterParam) => {
  try {
    const response = await axios.get("/users/all", {
      params: {
        filterParam: filterParam,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllVolunteers = async () => {
  try {
    const response = await axios.get(`/users/volunteers`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserById = async (userId: number) => {
  try {
    const response = await axios.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserDisplayData = async (
  userId: number,
): Promise<UserDisplay | undefined> => {
  if (userId) {
    try {
      const response = await axios.get<UserDisplay>(
        `/users/${userId}/display-data`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export const fetchUserAmountOfCreatedForumPosts = async (authorId) => {
  try {
    const response = await axios.get(`/forum/posts/author/${authorId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserIdByUsername = async (username) => {
  try {
    const response = await axios.get(`/users/${username}/id`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleSendUserMessage = async (userId, messageData) => {
  try {
    const response = await axios.post(
      `/messages/${userId}/send-message`,
      messageData,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchUserAllNonReadMessages = async (userId) => {
  try {
    const response = await axios.get(`/messages/${userId}/get-non-reads`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleMessageAsRead = async (warnId) => {
  try {
    const response = await axios.put(`/messages/${warnId}/is-read`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const handleUpdateUserData = async (userId, updateData) => {
  try {
    const response = await axios.patch(`/users/${userId}/update`, updateData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const handleUpdateUserFiles = async (
  userId: number,
  photo: File,
  photoType: string,
) => {
  const formData = new FormData();
  formData.append(`${photoType}`, photo);

  try {
    const response = await axios.put(
      `/users/${userId}/update-files`,
      formData,
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
