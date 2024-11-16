import { useMutation } from "react-query";
import { handleLogin } from "../../helpers/api-calls/AuthenticationHandling.js";
import { LoginRequest } from "../../models/LoginRequest";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authenticationSlice";

type UseLoginMutationProps = {
  onSuccessCallback: () => void;
  setErrors: (data: string) => void;
};

function UseLoginMutation({
  onSuccessCallback,
  setErrors,
}: UseLoginMutationProps) {
  const dispatch = useDispatch();

  const { mutate: loginUser, isLoading: loggingUser } = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: (loginRequest: LoginRequest) => handleLogin(loginRequest),
    onSuccess: (response) => {
      dispatch(login(response));

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error) => {
      const { data } = error.response;
      setErrors(data.errorMessage);
    },
  });

  return { loginUser, loggingUser };
}

export default UseLoginMutation;
