import { useMutation, useQueryClient } from "react-query";
import { handleUpdateArticle } from "../../helpers/api-calls/ArticleDataHandling.js";

function UseUpdateArticleMutation(articleId, onSuccessCallback) {
  const queryClient = useQueryClient();

  const { mutate: updateArticle, isLoading: updatingArticle } = useMutation({
    mutationKey: ["updateArticle"],
    mutationFn: (articleData) => handleUpdateArticle(articleId, articleData),
    onSuccess: () => {
      queryClient.invalidateQueries("homeNewsPostsData");
      queryClient.invalidateQueries("articleData", articleId);

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error) => console.log(error),
  });

  return { updateArticle, updatingArticle };
}

export default UseUpdateArticleMutation;
