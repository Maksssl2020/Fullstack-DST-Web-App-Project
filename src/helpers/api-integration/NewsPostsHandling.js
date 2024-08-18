import axios from "../AxiosConfig";

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

export const handleHomeNewsPostDelete = async (postId) => {
  try {
    const response = await axios.delete(`/home/posts/delete-post/${postId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
