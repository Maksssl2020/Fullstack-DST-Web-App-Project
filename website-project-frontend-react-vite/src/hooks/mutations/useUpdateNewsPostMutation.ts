import { useMutation, useQueryClient } from "react-query";
import { handleNewsPostUpdate } from "../../helpers/api-calls/NewsPostsHandling.js";

function UseUpdateNewsPostMutation(onSuccessCallback) {
  const queryClient = useQueryClient();

  const { mutate: updateNewsPostData, isLoading: updatingNewsPostData } =
    useMutation({
      mutationKey: ["updateNewsPostData"],
      mutationFn: ({ newsPostId, dataToUpdate }) =>
        handleNewsPostUpdate(newsPostId, dataToUpdate),
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["newsPostsData"]);

        if (onSuccessCallback) {
          onSuccessCallback();
        }
      },
    });

  return { updateNewsPostData, updatingNewsPostData };
}

export default UseUpdateNewsPostMutation;
