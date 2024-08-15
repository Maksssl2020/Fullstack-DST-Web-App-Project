import axios from "../../helpers/AxiosConfig";

export const fetchArticleData = async (articleId) => {
  try {
    const response = await axios.get(`/articles/${articleId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleAddNewArticle = async (articleData) => {
  try {
    const response = await axios.post("/articles/add-article", articleData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
