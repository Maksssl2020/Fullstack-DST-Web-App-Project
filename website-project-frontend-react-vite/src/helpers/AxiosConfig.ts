import axios from "axios";
import { handleRefreshToken } from "./api-calls/AuthenticationHandling.js";
import { store } from "../redux/store/store";
import { login } from "../redux/slices/authenticationSlice";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

instance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.persistedReducer.authentication.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const response = error?.response;
      const originalRequest = error?.config;

      if (response?.data.message.includes("Jwt token expired!")) {
        const refreshToken =
          store.getState().persistedReducer.authentication.refreshToken;

        if (refreshToken) {
          const receivedData = await handleRefreshToken(refreshToken);

          console.log(receivedData);

          if (!receivedData) return;

          login({
            userId: receivedData.userId,
            accessToken: receivedData.accessToken,
            refreshToken: receivedData.refreshToken,
            role: receivedData.role,
          });

          if (originalRequest === undefined) return;
          originalRequest.headers.Authorization = `Bearer ${receivedData.accessToken}`;

          return axios(originalRequest);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
