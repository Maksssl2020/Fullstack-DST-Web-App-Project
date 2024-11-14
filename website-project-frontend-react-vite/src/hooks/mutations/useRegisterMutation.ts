import { useMutation } from "react-query";
import { handleRegister } from "../../helpers/api-integration/AuthenticationHandling.js";

function UseRegisterMutation(onSuccessCallback, setFormRegisterErrors) {
  const { mutate: registerUser, isLoading: registeringUser } = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: (userData) => handleRegister(userData),
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error) => {
      if (error?.response?.data?.errorMessage?.includes("(email)=")) {
        setFormRegisterErrors("email", {
          type: "manual",
          message: "Podany adres e-mail istnieje w bazie!",
        });
      }
      if (error?.response?.data?.errorMessage?.includes("(username)=")) {
        setFormRegisterErrors("username", {
          type: "manual",
          message: "Podana nazwa użytkownika istnieje w bazie!",
        });
      }
    },
  });

  return { registerUser, registeringUser };
}

export default UseRegisterMutation;
