import axios from "axios";
import store from "../store/store.js";
import { loginUserAction } from "../actions/authenticationAction.js";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

instance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.authentication.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const state = store.getState();
      const refreshToken = state.authentication.refreshToken;

      if (refreshToken) {
        try {
          const response = await axios.post(
            `http://localhost:8080/api/v1/auth/refresh-token`,
            refreshToken,
          );

          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;
          const userRole = response.data.userRole;

          store.dispatch(
            loginUserAction({
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
              userRole: userRole,
            }),
          );
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axios(originalRequest);
        } catch (error) {
          console.error(error);
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
