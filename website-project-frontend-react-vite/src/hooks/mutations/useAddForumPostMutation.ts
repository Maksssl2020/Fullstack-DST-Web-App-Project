import { useMutation, useQueryClient } from "react-query";
import { handleAddForumPost } from "../../helpers/api-calls/ForumPostsHandling.js";

function UseAddForumPostMutation(onSuccessCallback) {
  const queryClient = useQueryClient();

  const { mutate: addNewForumPost, isLoading: addingNewForumPost } =
    useMutation({
      mutationKey: ["addNewForumPost"],
      mutationFn: (newForumPostData) => handleAddForumPost(newForumPostData),
      onSuccess: () => {
        queryClient.invalidateQueries("forumPostsData");
        queryClient.refetchQueries("forumPostsData");

        if (onSuccessCallback) {
          onSuccessCallback();
        }
      },
      onError: (error) => console.log(error),
    });

  return { addNewForumPost, addingNewForumPost };
}

export default UseAddForumPostMutation;
