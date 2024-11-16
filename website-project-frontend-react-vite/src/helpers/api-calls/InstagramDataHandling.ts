import customAxios from "../AxiosConfig.js";
import axios from "axios";

export const fetchInstagramUserData = async () => {
  try {
    const response = await customAxios.get("/instagram/user");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

export const fetchInstagramUserPostsData = async () => {
  try {
    const response = await customAxios.get("/instagram/user/media");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

export const fetchInstagramPostAllImages = async (postId: number) => {
  try {
    const response = await customAxios.get(`/instagram/user/${postId}/images`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};
