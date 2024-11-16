import { useMutation, useQueryClient } from "react-query";
import { handleSendUserMessage } from "../../helpers/api-calls/UserDataHandling.js";

function UseSendMessageToUserMutation(userId, onSuccessCallback) {
  const queryClient = useQueryClient();

  const { mutate: sendMessageToUser, isLoading: sendingMessageToUser } =
    useMutation({
      mutationKey: ["sendingMessageToUserAfterAcceptingRequest"],
      mutationFn: ({ requestId, messageData }) => {
        if (requestId !== null) {
          return handleSendUserMessage(userId, messageData);
        } else {
          return handleSendUserMessage(userId, messageData);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["userMessages", userId]);

        if (onSuccessCallback) {
          onSuccessCallback();
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });

  return { sendMessageToUser, sendingMessageToUser };
}

export default UseSendMessageToUserMutation;
