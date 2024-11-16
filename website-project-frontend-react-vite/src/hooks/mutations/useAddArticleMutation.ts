import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { handleAddNewArticle } from "../../helpers/api-calls/ArticleDataHandling.js";

function UseAddArticleMutation(onSuccessCallback) {
  const queryClient = useQueryClient();

  const { mutate: addArticle, isLoading: addingArticle } = useMutation({
    mutationKey: ["addArticle"],
    mutationFn: (articleData) => handleAddNewArticle(articleData),
    onSuccess: () => {
      queryClient.invalidateQueries("newsSectionPostsData");
      queryClient.invalidateQueries("homeNewsPostsData");

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error) => console.log(error),
  });

  return { addArticle, addingArticle };
}

export default UseAddArticleMutation;
