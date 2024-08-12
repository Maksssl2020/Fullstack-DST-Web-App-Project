import axios from "../AxiosConfig";

export const fetchNewsPostData = async (currentPage) => {
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

export const handleNewsPostDelete = async (postId) => {
  try {
    const response = await axios.delete(`/news/delete-post/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
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
