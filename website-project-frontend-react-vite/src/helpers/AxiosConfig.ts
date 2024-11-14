import axios from "axios";
import { handleRefreshToken } from "./api-integration/AuthenticationHandling.js";
import { loginUserAction } from "../actions/authenticationAction.js";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

instance.interceptors.request.use((config) => {
  const state = useSelector(
    (state: RootState) => state.persistedReducer.authentication,
  );
  const token = state.accessToken;

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
      const refreshToken = useSelector(
        (state: RootState) => state.persistedReducer.authentication,
      );

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
