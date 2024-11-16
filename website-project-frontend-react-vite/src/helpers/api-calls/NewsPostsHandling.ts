import customAxios from "../AxiosConfig.js";
import { HomeNewsPostUpdateRequest } from "../../models/HomeNewsPostUpdateRequest";
import { NewsPost } from "../../models/NewsPost";
import { HomeNewsPost } from "../../models/HomeNewsPost";
import axios from "axios";

export const fetchAllNewsPostsData = async (currentPage: number) => {
  try {
    const response = await customAxios.get<NewsPost[]>("/news", {
      params: {
        page: currentPage,
        size: 16,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

export const fetchNewsPostDataByPostId = async (postId: number) => {
  try {
    const response = await customAxios.get<NewsPost>(`/news/${postId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

export const handleNewsPostDelete = async (postId: number) => {
  try {
    const response = await customAxios.delete(`/news/delete-post/${postId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

export const handleNewsPostUpdate = async (
  postId: number,
  updatedContent: string,
) => {
  const dataToSend = new FormData();
  dataToSend.append("content", updatedContent);

  try {
    const response = await customAxios.put(
      `/news/edit-post/${postId}`,
      dataToSend,
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const fetchHomeNewsPostsData = async () => {
  try {
    const response = await customAxios.get<HomeNewsPost[]>("/home/posts");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

export const fetchHomeNewsPostData = async (postId: number) => {
  try {
    const response = await customAxios.get<HomeNewsPost>(
      `/home/posts/${postId}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

export const handleHomeNewsPostUpdate = async (
  postId: number,
  updatedContent: HomeNewsPostUpdateRequest,
) => {
  const formData = new FormData();
  formData.append("content", updatedContent.content);
  formData.append("image", updatedContent.image[0]);

  console.log(formData);

  try {
    const response = await customAxios.put(
      `home/posts/edit-post/${postId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};

export const handleHomeNewsPostDelete = async (postId: number) => {
  try {
    const response = await customAxios.delete(
      `/home/posts/delete-post/${postId}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};
