import { useMutation, useQueryClient } from "react-query";
import { handleMessageAsRead } from "../../helpers/api-calls/UserDataHandling.js";
import useAuthentication from "../others/useAuthentication.js";

function UseMarkMessageAsReadMutation() {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: markMessageAsRead, isLoading: markingMessageAsRead } =
    useMutation({
      mutationKey: ["markMessageAsRead"],
      mutationFn: (messageId: number) => handleMessageAsRead(messageId),
      onSuccess: () => {
        queryClient.invalidateQueries(["userMessages", userId]);
      },
      onError: (error) => console.log(error),
    });

  return { markMessageAsRead, markingMessageAsRead };
}

export default UseMarkMessageAsReadMutation;
