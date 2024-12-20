import customAxios from "../AxiosConfig.js";
import { LoginRequest } from "../../models/LoginRequest";
import { AccountData } from "../../models/AccountData";
import { RegisterRequest } from "../../models/RegisterRequest";
import axios from "axios";

export const handleRegister = async (registrationData: RegisterRequest) => {
  try {
    const response = await customAxios.post("/auth/register", registrationData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const handleAccountActivation = async (activationCode: string) => {
  const activationData = new FormData();
  activationData.append("activationCode", activationCode);
  console.log(activationCode);
  try {
    const response = await customAxios.post(
      "/auth/activate-account",
      activationData,
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const handleLogin = async (loginRequest: LoginRequest) => {
  try {
    const response = await customAxios.post<AccountData>(
      "/auth/login",
      {
        username: loginRequest.username,
        password: loginRequest.password,
      },
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const handleResetPassword = async (userEmail: string) => {
  try {
    const response = await customAxios.post("/auth/reset-password", userEmail);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const handleRefreshToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/auth/refresh-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
