import { useQuery } from "react-query";
import { fetchArticleData } from "../../helpers/api-calls/ArticleDataHandling.js";

const UseArticle = (articleId) => {
  const { data: article, isLoading: fetchingArticle } = useQuery(
    ["articleData", articleId],
    () => fetchArticleData(articleId),
    {
      cacheTime: 1000 * 60 * 30,
    },
  );

  return { article, fetchingArticle };
};

export default UseArticle;
