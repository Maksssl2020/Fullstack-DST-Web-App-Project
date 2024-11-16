import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { handlePostDelete } from "../../helpers/api-calls/ForumPostsHandling.js";
import toast from "react-hot-toast";

function useDeleteForumPostMutation(postId) {
  const queryClient = useQueryClient();

  const { mutate: deleteForumPost, isLoading: deletingForumPost } = useMutation(
    {
      mutationKey: ["deleteForumPost", postId],
      mutationFn: () => handlePostDelete(postId),
      onSuccess: () => {
        queryClient.invalidateQueries("forumPostsData");
        toast.success("Post został pomyślnie usunięty!");
      },
      onError: (error) => console.log(error),
    },
  );

  return { deleteForumPost, deletingForumPost };
}

export default useDeleteForumPostMutation;
