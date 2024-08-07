import axios from "../AxiosConfig";

export const fetchPostsData = async (page) => {
  try {
    const response = await axios.get("/forum/posts", {
      params: {
        page: page,
        size: 8,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const handlePostDelete = async (postId) => {
  try {
    await axios.delete(`/forum/posts/delete-post/${postId}`);
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserAvatar = async (author) => {
  try {
    const response = await axios.get(`/users/${author}/avatar`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPostUsersComments = async (postId) => {
  try {
    const response = await axios.get(`/comments/post/${postId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleAddComment = async (postId, newCommentData) => {
  try {
    const response = await axios.post(
      `/comments/post/${postId}/add-comment`,
      newCommentData,
    );
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};
