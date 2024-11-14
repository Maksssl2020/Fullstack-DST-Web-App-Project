import axios from "../AxiosConfig.js";

export const fetchInstagramUserData = async () => {
  try {
    const response = await axios.get("/instagram/user");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchInstagramUserPostsData = async () => {
  try {
    const response = await axios.get("/instagram/user/media");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchInstagramPostAllImages = async (postId) => {
  try {
    const response = await axios.get(`/instagram/user/${postId}/images`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
