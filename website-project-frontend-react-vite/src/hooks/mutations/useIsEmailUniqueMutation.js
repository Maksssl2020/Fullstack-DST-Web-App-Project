import { useMutation } from "react-query";
import { checkEmailIsUnique } from "../../helpers/api-integration/UserDataHandling.js";

function UseIsEmailUniqueMutation() {
  const { mutate: checkIsEmailUnique, isLoading: checkingIsEmailUnique } =
    useMutation((enteredEmail) => checkEmailIsUnique(enteredEmail), {
      onError: (error) => {
        console.error(error);
      },
    });

  const isEmailUnique = (enteredEmail) => {
    return new Promise((resolve, reject) => {
      checkIsEmailUnique(enteredEmail, {
        onSuccess: (response) => resolve(response),
        onError: (error) => reject(error),
      });
    });
  };

  return { isEmailUnique, checkingIsEmailUnique };
}

export default UseIsEmailUniqueMutation;
