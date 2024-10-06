import { useMutation, useQueryClient } from "react-query";
import { handleSendUserMessage } from "../../helpers/api-integration/UserDataHandling.js";

function UseSendMessageToUserMutation(userId) {
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
      },
      onError: (error) => {
        console.log(error);
      },
    });

  return { sendMessageToUser, sendingMessageToUser };
}

export default UseSendMessageToUserMutation;
