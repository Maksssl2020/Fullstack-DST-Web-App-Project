import { useMutation } from "react-query";
import { fetchArticleData } from "../../helpers/api-integration/ArticleDataHandling.js";

function UseArticleMutation(onSuccessCallback) {
  const { mutate: fetchArticle, isLoading: fetchingArticle } = useMutation(
    ["fetchArticleData"],
    (articleId) => fetchArticleData(articleId),
    {
      onSuccess: (articleCurrentData) => {
        if (onSuccessCallback) {
          onSuccessCallback(articleCurrentData);
        }
      },
    },
  );

  return {
    fetchArticle,
    fetchingArticle,
  };
}

export default UseArticleMutation;
