import { useMutation, useQueryClient } from "react-query";
import { handleCommentDelete } from "../../helpers/api-calls/ForumPostsHandling.js";

function UseDeleteForumPostCommentMutation(postId, commentId) {
  const queryClient = useQueryClient();

  const {
    mutate: deleteForumPostComment,
    isLoading: deletingForumPostComment,
  } = useMutation({
    mutationFn: () => handleCommentDelete(commentId),
    onMutate: async () => {
      await queryClient.cancelQueries(["forumPostComments", postId]);
      const previousComments = queryClient.getQueriesData([
        "forumPostComments",
        postId,
      ]);

      queryClient.setQueriesData(["forumPostComments", postId], (old = []) => {
        return old.filter((comment) => comment.id !== commentId);
      });

      return { previousComments };
    },
    onError: (error, oldComment, context) => {
      queryClient.setQueriesData(
        ["forumPostComments", postId],
        context.previousComments,
      );
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["forumPostComments", postId]);
    },
  });

  return { deleteForumPostComment, deletingForumPostComment };
}

export default UseDeleteForumPostCommentMutation;
