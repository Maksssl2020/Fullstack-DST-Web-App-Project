import { useMutation, useQueryClient } from "react-query";
import { handleUpdateUserData } from "../../helpers/api-integration/UserDataHandling.js";
import useAuthentication from "../queries/useAuthentication.js";

function UseUpdateUserInAccountPageMutation(onSuccessCallback) {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: updatingUser } = useMutation({
    mutationKey: ["accountUpdateUser", userId],
    mutationFn: (updatedData) => {
      console.log("updatingUser", updatedData);
      return handleUpdateUserData(userId, updatedData);
    },
    onMutate: async (updatedData) => {
      await queryClient.cancelQueries(["userData", userId]);
      const previousUserData = queryClient.getQueryData(["userData", userId]);

      queryClient.setQueryData(["userData", userId], (old) => {
        return { ...old, updatedData };
      });

      return { previousUserData };
    },
    onError: (error, updatedData, context) => {
      queryClient.setQueryData(["userData", userId], context.previousUserData);
      console.log(error);
    },
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["userData", userId]);
    },
  });

  return { updateUser, updatingUser };
}

export default UseUpdateUserInAccountPageMutation;
