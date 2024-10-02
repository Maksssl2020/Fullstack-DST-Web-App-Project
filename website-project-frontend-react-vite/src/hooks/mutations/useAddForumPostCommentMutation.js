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
      mutationKey: ["addingForumPostComment", forumPostId],
      mutationFn: (content) =>
        handleAddComment(forumPostId, {
          content: content,
          authorId: userId,
        }),
      onMutate: async (newComment) => {
        await queryClient.cancelQueries([`forumPostComments${forumPostId}`]);
        const previousCommentsData = queryClient.getQueriesData([
          `forumPostComments${forumPostId}`,
        ]);

        queryClient.setQueriesData(
          [`forumPostComments${forumPostId}`],
          (old) => {
            return [...old, { id: old?.id + 1 || 1, content: newComment }];
          },
        );

        return { previousCommentsData };
      },
      onSuccess: () => {
        if (onSuccessCallback) {
          onSuccessCallback();
        }
      },
      onError: (error, newComment, context) => {
        queryClient.setQueriesData(
          [`forumPostComments${forumPostId}`],
          context.previousCommentsData,
        );
        console.log(error);
      },
      onSettled: () => {
        queryClient.invalidateQueries([`forumPostComments${forumPostId}`]);
      },
    });

  return { addForumPostComment, addingForumPostComment };
}

export default UseAddForumPostCommentMutation;
