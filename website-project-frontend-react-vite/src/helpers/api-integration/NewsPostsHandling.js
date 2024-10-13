import axios from "../AxiosConfig.js";

export const fetchAllNewsPostsData = async (currentPage) => {
  try {
    const response = await axios.get("/news", {
      params: {
        page: currentPage,
        size: 16,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchNewsPostDataByPostId = async (postId) => {
  try {
    const response = await axios.get(`/news/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const handleNewsPostDelete = async (postId) => {
  try {
    const response = await axios.delete(`/news/delete-post/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const handleNewsPostUpdate = async (postId, updatedContent) => {
  const dataToSend = new FormData();
  dataToSend.append("content", updatedContent);

  try {
    const response = await axios.put(`/news/edit-post/${postId}`, dataToSend);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchHomeNewsPostsData = async () => {
  try {
    const response = await axios.get("/home/posts");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchHomeNewsPostData = async (postId) => {
  try {
    const response = await axios.get(`/home/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleHomeNewsPostUpdate = async (postId, updatedContent) => {
  const formData = new FormData();
  formData.append("content", updatedContent.content);
  formData.append("image", updatedContent.image[0]);

  console.log(formData);

  try {
    const response = await axios.put(
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
    console.log(error);
  }
};

export const handleHomeNewsPostDelete = async (postId) => {
  try {
    const response = await axios.delete(`/home/posts/delete-post/${postId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
