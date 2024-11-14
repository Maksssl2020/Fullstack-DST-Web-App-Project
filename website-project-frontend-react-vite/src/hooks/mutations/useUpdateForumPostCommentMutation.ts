import { useMutation, useQueryClient } from "react-query";
import { handleCommentUpdate } from "../../helpers/api-integration/ForumPostsHandling.js";

function UseUpdateForumPostCommentMutation(
  postId,
  commentId,
  onSuccessCallback,
) {
  const queryClient = useQueryClient();

  const {
    mutate: updateForumPostComment,
    isLoading: updatingForumPostComment,
  } = useMutation({
    mutationFn: (commentContent) =>
      handleCommentUpdate(postId, commentId, {
        commentContent: commentContent,
      }),
    onMutate: async (newComment) => {
      await queryClient.cancelQueries(["forumPostComments", postId]);
      const previousComments = queryClient.getQueriesData([
        "forumPostComments",
        postId,
      ]);

      queryClient.setQueriesData(["forumPostComments", postId], (old = []) => {
        return old.map((comment) =>
          comment.id === commentId
            ? { ...comment, commentContent: newComment }
            : comment,
        );
      });

      return { previousComments };
    },
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error, newComment, context) => {
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

  return { updateForumPostComment, updatingForumPostComment };
}

export default UseUpdateForumPostCommentMutation;
