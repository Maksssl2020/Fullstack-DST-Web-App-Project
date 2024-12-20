import { useMutation } from "react-query";
import { handleSendingNewRequest } from "../../helpers/api-calls/RequestsToAdminHandling.js";
import useAuthentication from "../others/useAuthentication.js";

function UseSendRequestToAdminMutation(onSuccessCallback) {
  const { userId } = useAuthentication();

  const { mutate: sendRequestToAdmin, isLoading: sendingRequestToAdmin } =
    useMutation({
      mutationKey: ["sendRequestToAdmin", userId],
      mutationFn: (requestData) => handleSendingNewRequest(requestData),
      onSuccess: () => {
        if (onSuccessCallback) {
          onSuccessCallback();
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });

  return { sendRequestToAdmin, sendingRequestToAdmin };
}

export default UseSendRequestToAdminMutation;
