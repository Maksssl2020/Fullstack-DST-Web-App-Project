import axios from "../AxiosConfig.js";

export const handleRegister = async (registrationData) => {
  try {
    const response = await axios.post("/auth/register", registrationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleAccountActivation = async (activationCode) => {
  const activationData = new FormData();
  activationData.append("activationCode", activationCode);
  console.log(activationCode);
  try {
    const response = await axios.post("/auth/activate-account", activationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleLogin = async (username, password) => {
  try {
    const response = await axios.post(
      "/auth/login",
      {
        username: username,
        password: password,
      },
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleResetPassword = async (userEmail) => {
  try {
    const response = await axios.post("/auth/reset-password", userEmail);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const handleRefreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      "/auth/refresh-token",
      { refreshToken },
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
