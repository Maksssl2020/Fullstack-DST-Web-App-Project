import { useMutation } from "react-query";
import { handleHomeNewsPostUpdate } from "../../helpers/api-calls/NewsPostsHandling.js";

function UseUpdateHomeNewsPostMutation(onSuccessCallback) {
  const { mutate: updateHomeNewsPost, isLoading: updatingHomeNewsPost } =
    useMutation(
      ["updateHomeNewsPost"],
      ({ homeNewsPostId, updatedData }) =>
        handleHomeNewsPostUpdate(homeNewsPostId, updatedData),
      {
        onSuccess: () => {
          if (onSuccessCallback) {
            onSuccessCallback();
          }
        },
      },
    );

  return { updateHomeNewsPost, updatingHomeNewsPost };
}

export default UseUpdateHomeNewsPostMutation;
