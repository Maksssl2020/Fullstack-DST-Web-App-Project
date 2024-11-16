import { useMutation, useQueryClient } from "react-query";
import { handleNewsPostDelete } from "../../helpers/api-calls/NewsPostsHandling.js";
import toast from "react-hot-toast";

function UseDeleteNewsPostMutation(newsPostId) {
  const queryClient = useQueryClient();

  const { mutate: deleteNewsPost, isLoading: deletingNewsPost } = useMutation({
    mutationKey: ["deleteNewsPost", newsPostId],
    mutationFn: () => handleNewsPostDelete(newsPostId),
    onMutate: async () => {
      await queryClient.cancelQueries(["newsPostsData"]);
      const previousNewsPosts = queryClient.getQueriesData(["newsPostsData"]);

      queryClient.setQueriesData(["newsPostsData"], (old = []) => {
        return old.filter((newsPost) => newsPost.id !== newsPostId);
      });

      return { previousNewsPosts };
    },
    onError: (error, variables, context) => {
      queryClient.setQueriesData(["newsPostsData"], context.previousNewsPosts);
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries("newsPostsData");
    },
    onSuccess: () => {
      toast.success("Usunięto post z tęczowych wiadomości!");
    },
  });

  return { deleteNewsPost, deletingNewsPost };
}

export default UseDeleteNewsPostMutation;
