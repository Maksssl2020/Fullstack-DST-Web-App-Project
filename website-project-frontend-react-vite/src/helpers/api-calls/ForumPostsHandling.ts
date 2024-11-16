import axios from "../AxiosConfig.js";

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

export const fetchPostData = async (postId) => {
  try {
    const response = await axios.get(`/forum/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleAddForumPost = async (forumPostData) => {
  try {
    const response = await axios.post("/forum/create-post", forumPostData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const handleUpdateForumPost = async (postId, forumPostData) => {
  try {
    const response = await axios.put(
      `/forum/posts/edit-post/${postId}`,
      forumPostData,
    );
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

export const handleCommentUpdate = async (
  postId,
  commentId,
  commentNewData,
) => {
  try {
    const response = await axios.put(
      `/comments/post/${postId}/edit-comment/${commentId}`,
      commentNewData,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleCommentDelete = async (commentId) => {
  try {
    await axios.delete(`/comments/delete-comment/${commentId}`);
  } catch (error) {
    console.log(error);
  }
};
