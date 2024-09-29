import { useMutation, useQueryClient } from "react-query";
import { handleAddComment } from "../../helpers/api-integration/ForumPostsHandling.js";

function UseAddForumPostCommentMutation(
  forumPostId,
  userId,
  onSuccessCallback,
) {
  const queryClient = useQueryClient();

  const { mutate: addForumPostComment, isLoading: addingForumPostComment } =
    useMutation({
      mutationKey: "addingForumPostComment",
      mutationFn: (content) =>
        handleAddComment(forumPostId, {
          content: content,
          authorId: userId,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries(`forumPostComments${forumPostId}`);

        if (onSuccessCallback) {
          onSuccessCallback();
        }
      },
      onError: (error) => console.log(error),
    });

  return { addForumPostComment, addingForumPostComment };
}

export default UseAddForumPostCommentMutation;
