import axios from "../../helpers/AxiosConfig";

export const fetchArticleData = async (articleId) => {
  try {
    const response = await axios.get(`/articles/${articleId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
