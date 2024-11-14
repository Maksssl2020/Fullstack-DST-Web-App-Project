import { useMutation } from "react-query";
import { checkUsernameIsUnique } from "../../helpers/api-integration/UserDataHandling.js";

function UseIsUsernameUniqueMutation() {
  const { mutate: checkIsUsernameUnique, isLoading: checkingIsUsernameUnique } =
    useMutation((enteredUsername) =>
      checkUsernameIsUnique(enteredUsername, {
        onError: (error) => {
          console.log(error);
        },
      }),
    );

  const isUsernameUnique = (enteredUsername) => {
    return new Promise((resolve, reject) => {
      checkIsUsernameUnique(enteredUsername, {
        onSuccess: (response) => resolve(response),
        onError: (error) => reject(error),
      });
    });
  };

  return {
    isUsernameUnique,
    checkingIsUsernameUnique,
  };
}

export default UseIsUsernameUniqueMutation;
