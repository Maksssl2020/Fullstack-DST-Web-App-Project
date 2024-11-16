import axios from "axios";
import { handleRefreshToken } from "./api-calls/AuthenticationHandling.js";
import { useDispatch } from "react-redux";
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
      const data = error?.response?.data;
      const originalRequest = error?.config;

      if (
        data.businessErrorCode === 399 &&
        data.errorMessage.includes("Jwt Token Expired")
      ) {
        const dispatch = useDispatch();
        const refreshToken =
          store.getState().persistedReducer.authentication.refreshToken;

        if (refreshToken) {
          const receivedData = await handleRefreshToken(refreshToken);

          if (!receivedData) return;

          dispatch(
            login({
              userId: receivedData.userId,
              accessToken: receivedData.accessToken,
              refreshToken: receivedData.refreshToken,
              role: receivedData.role,
            }),
          );

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
