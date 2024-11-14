import { useMutation } from "react-query";
import { handleLogin } from "../../helpers/api-integration/AuthenticationHandling.js";
import useAuthentication from "../others/useAuthentication.js";

function UseLoginMutation(onSuccessCallback, setLoginErrors) {
  const { login } = useAuthentication();

  const { mutate: loginUser, isLoading: loggingUser } = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: ({ username, password }) => handleLogin(username, password),
    onSuccess: (response) => {
      login(response);

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error) => {
      const { data } = error.response;
      setLoginErrors(data.errorMessage);
    },
  });

  return { loginUser, loggingUser };
}

export default UseLoginMutation;
