import axios from "../AxiosConfig";

export const fetchUserAvatar = async (author) => {
  try {
    const response = await axios.get(`/users/${author}/avatar`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserAmountOfCreatedForumPosts = async (username) => {
  try {
    const response = await axios.get(`/forum/posts/author/${username}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
