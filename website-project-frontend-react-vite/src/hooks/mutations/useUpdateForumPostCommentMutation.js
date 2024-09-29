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
    onSuccess: () => {
      queryClient.invalidateQueries(`forumPostComments${postId}`);

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error) => console.log(error),
  });

  return { updateForumPostComment, updatingForumPostComment };
}

export default UseUpdateForumPostCommentMutation;
