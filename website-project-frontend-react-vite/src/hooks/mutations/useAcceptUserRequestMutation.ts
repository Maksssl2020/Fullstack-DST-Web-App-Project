import { useMutation, useQueryClient } from "react-query";
import { handleAcceptRequestToAdmin } from "../../helpers/api-calls/RequestsToAdminHandling.js";

function UseAcceptUserRequestMutation(userId, onSuccessCallback) {
  const queryClient = useQueryClient();

  const { mutate: acceptUserRequest, isLoading: acceptingUserRequest } =
    useMutation({
      mutationKey: ["acceptUserRequest"],
      mutationFn: (requestId) => handleAcceptRequestToAdmin(requestId),
      onSuccess: () => {
        queryClient.invalidateQueries(["usersRequestsData"]);
        queryClient.invalidateQueries(["userData", userId]);

        if (onSuccessCallback) {
          onSuccessCallback();
        }
      },
    });

  return { acceptUserRequest, acceptingUserRequest };
}

export default UseAcceptUserRequestMutation;
