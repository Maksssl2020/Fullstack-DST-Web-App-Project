import axios from "axios";
import store from "../store/store.js";
import { handleRefreshToken } from "./api-integration/AuthenticationHandling.js";
import { loginUserAction } from "../actions/authenticationAction.js";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

instance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state?.authentication?.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    const { data } = error.response;
    const originalRequest = error.config;

    if (
      data.businessErrorCode === 399 &&
      data.errorMessage.includes("Jwt Token Expired")
    ) {
      const state = store.getState();
      const refreshToken = state?.authentication?.refreshToken;

      if (refreshToken) {
        const receivedData = handleRefreshToken(refreshToken);

        const newAccessToken = receivedData.accessToken;
        const newRefreshToken = receivedData.refreshToken;
        const userRole = receivedData.userRole;

        store.dispatch(
          loginUserAction({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            userRole: userRole,
          }),
        );
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
