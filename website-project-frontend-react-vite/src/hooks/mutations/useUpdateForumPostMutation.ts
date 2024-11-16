import { useMutation, useQueryClient } from "react-query";
import { handleUpdateForumPost } from "../../helpers/api-calls/ForumPostsHandling.js";

function UseUpdateForumPostMutation(forumPostId, onSuccessCallback) {
  const queryClient = useQueryClient();

  const { mutate: updateForumPost, isLoading: updatingForumPost } = useMutation(
    {
      mutationKey: ["updateForumPost"],
      mutationFn: (forumPostDataToUpdate) =>
        handleUpdateForumPost(forumPostId, forumPostDataToUpdate),
      onMutate: async (forumPostDataToUpdate) => {
        await queryClient.cancelQueries(["forumPostsData"]);
        const previousForumPosts = queryClient.getQueriesData([
          "forumPostsData",
        ]);

        queryClient.setQueriesData("forumPostsData", (old) => {
          return {
            ...old,
            content: old.content.map((post) => {
              return `${post.id}` === `${forumPostId}`
                ? { ...post, ...forumPostDataToUpdate }
                : post;
            }),
          };
        });

        return { previousForumPosts };
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["forumPostData", forumPostId]);
        queryClient.refetchQueries(["forumPostsData"]);

        if (onSuccessCallback) {
          onSuccessCallback();
        }
      },
      onError: (error) => console.log(error),
    },
  );

  return { updateForumPost, updatingForumPost };
}

export default UseUpdateForumPostMutation;
