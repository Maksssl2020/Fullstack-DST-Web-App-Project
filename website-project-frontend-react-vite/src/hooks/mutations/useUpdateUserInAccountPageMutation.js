import { useMutation, useQueryClient } from "react-query";
import { handleUpdateUserData } from "../../helpers/api-integration/UserDataHandling.js";

function UseUpdateUserInAccountPageMutation(onSuccessCallback) {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: updatingUser } = useMutation({
    mutationKey: ["updateUserData"],
    mutationFn: ({ userId, updatedData }) => {
      console.log("updatingUser", updatedData);
      return handleUpdateUserData(userId, updatedData);
    },
    onMutate: async ({ userId, updatedData }) => {
      await queryClient.cancelQueries(["userData", userId]);
      const previousUserData = queryClient.getQueryData(["userData", userId]);

      queryClient.setQueryData(["userData", userId], (old) => {
        return { ...old, updatedData };
      });

      return { previousUserData, updatedData, userId };
    },
    onError: (error, userId, context) => {
      queryClient.setQueryData(["userData", userId], context.previousUserData);
      console.log(error);
    },
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onSettled: (data, error, variables) => {
      const { userId } = variables;
      queryClient.invalidateQueries(["userData", userId]);
    },
  });

  return { updateUser, updatingUser };
}

export default UseUpdateUserInAccountPageMutation;
