import axios from "../AxiosConfig";

export const handleLogin = async (username, password) => {
  try {
    const response = await axios.post("/auth/login", {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
