import { useMutation, useQueryClient } from "react-query";
import { handleDeleteRequestToAdmin } from "../../helpers/api-integration/RequestsToAdminHandling.js";

function UseRejectUserRequestMutation(userId, onSuccessCallback) {
  const queryClient = useQueryClient();

  const { mutate: rejectUserRequest, isLoading: rejectingUserRequest } =
    useMutation({
      mutationKey: ["rejectUserRequest"],
      mutationFn: (requestId) => handleDeleteRequestToAdmin(requestId),
      onSuccess: () => {
        queryClient.invalidateQueries(["usersRequestsData"]);
        queryClient.invalidateQueries(["userData", userId]);

        if (onSuccessCallback) {
          onSuccessCallback();
        }
      },
    });

  return { rejectUserRequest, rejectingUserRequest };
}

export default UseRejectUserRequestMutation;
