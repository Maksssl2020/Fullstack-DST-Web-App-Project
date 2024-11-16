import { useMutation, useQueryClient } from "react-query";
import { handleDeleteArticle } from "../../helpers/api-calls/ArticleDataHandling.js";

function UseDeleteArticleMutation(articleId, onSuccessCallback) {
  const queryClient = useQueryClient();

  const { mutate: deleteArticle, isLoading: deletingArticle } = useMutation(
    [`deleteArticle`],
    () => handleDeleteArticle(articleId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["managementArticlesData"]);
        queryClient.invalidateQueries(["newsPostsData"]);
        queryClient.invalidateQueries(["homeNewsPostsData"]);
        queryClient.invalidateQueries(["articleData", articleId]);

        if (onSuccessCallback) {
          onSuccessCallback();
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return { deleteArticle, deletingArticle };
}

export default UseDeleteArticleMutation;
