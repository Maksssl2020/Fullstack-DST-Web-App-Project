import { useMutation, useQueryClient } from "react-query";
import { handleCommentDelete } from "../../helpers/api-integration/ForumPostsHandling.js";

function UseDeleteForumPostCommentMutation(postId, commentId) {
  const queryClient = useQueryClient();

  const {
    mutate: deleteForumPostComment,
    isLoading: deletingForumPostComment,
  } = useMutation({
    mutationFn: () => handleCommentDelete(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries(`forumPostComments${postId}`);
    },
    onError: (error) => console.log(error),
  });

  return { deleteForumPostComment, deletingForumPostComment };
}

export default UseDeleteForumPostCommentMutation;
