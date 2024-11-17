import { useMutation, useQueryClient } from "react-query";
import { handleUpdateUserFiles } from "../../helpers/api-calls/UserDataHandling.js";
import useAuthentication from "../others/useAuthentication.js";
import { UserPhotoUpdateRequest } from "../../models/UserPhotoUpdateRequest";

function UseUpdateUserFilesMutation() {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: updateUserFiles, isLoading: updatingUserFiles } = useMutation(
    {
      mutationKey: ["accountUpdateUserFiles", userId],
      mutationFn: (userPhotoUpdateRequest: UserPhotoUpdateRequest) =>
        handleUpdateUserFiles(
          userId,
          userPhotoUpdateRequest.photo,
          userPhotoUpdateRequest.photoType,
        ),
      onMutate: async (updatedData) => {
        await queryClient.cancelQueries(["userDisplayData", userId]);
        const previousUserFiles = queryClient.getQueryData([
          "userDisplayData",
          userId,
        ]);

        queryClient.setQueryData(["userDisplayData", userId], (old) => {
          return { ...old, ...updatedData };
        });

        return { previousUserFiles };
      },
      onError: (error, updatedData, context) => {
        queryClient.setQueryData(
          ["userDisplayData", userId],
          context.updatedData,
        );
        console.log("Error updating user files:", error);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["userDisplayData", userId]);
      },
    },
  );
  return { updateUserFiles, updatingUserFiles };
}

export default UseUpdateUserFilesMutation;
