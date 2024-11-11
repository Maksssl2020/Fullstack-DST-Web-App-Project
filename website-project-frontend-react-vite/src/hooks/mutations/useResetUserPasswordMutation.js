import React from "react";
import { useMutation } from "react-query";
import { handleResetPassword } from "../../helpers/api-integration/AuthenticationHandling.js";
import toast from "react-hot-toast";
import { translateErrorsForUsers } from "../../errors/TranslateErrorsForUsers.js";

const UseResetUserPasswordMutation = () => {
  const { mutate: resetUserPassword, isLoading: resettingUserPassword } =
    useMutation(
      ["resetUserPassword"],
      (userEmail) => handleResetPassword(userEmail),
      {
        onSuccess: () => {
          toast.success("Wiadomość e-mail została wysłana!");
        },
        onError: (error) => {
          const { data } = error.response;
          toast.error(translateErrorsForUsers(data.errorMessage));
        },
      },
    );

  return { resetUserPassword, resettingUserPassword };
};

export default UseResetUserPasswordMutation;