import React, { useContext, useState } from "react";
import MainBannerWithoutLogo from "../components/universal/MainBannerWithoutLogo";
import FormItem from "../components/form/FormItem";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/provider/AuthProvider";
import AnimatedPage from "../animation/AnimatedPage";
import { useMutation } from "react-query";
import { handleLogin } from "../helpers/api-integration/AuthenticationHandling";
import toast from "react-hot-toast";

const SignIn = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const { mutate: loginUser, isLoading: loggingUser } = useMutation({
    mutationKey: ["loginUser", username, password],
    mutationFn: () => handleLogin(username, password),
    onSuccess: (response) => {
      login(response.token);
      toast.success("Logowanie udane!");
      navigate("/");
    },
    onError: (error) => {
      setErrors(error);
    },
  });

  let errorMessage;

  if (errors?.response?.data?.errorMessage.includes("locked")) {
    errorMessage = "Konto zostało zbanowane!";
  } else if (errors?.response?.data?.errorMessage.includes("credentials")) {
    errorMessage = "Nieprawidłowa nazwa użytkownika lub hasło!";
  } else if (
    errors?.response?.data?.errorMessage.includes("Account isn't activated")
  ) {
    errorMessage = "Konto nie zostało aktywowane! Sprawdź e-mail.";
  }

  return (
    <AnimatedPage>
      <div className="font-lato py-8 w-full bg-custom-gray-300 flex flex-col items-center justify-center h-auto">
        <MainBannerWithoutLogo bannerTitle={"Zaloguj się"} />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            loginUser();
          }}
          className="w-[850px] p-8 flex flex-col items-center rounded-2xl my-12 h-auto bg-custom-gray-100"
        >
          <FormItem
            labelData={"Nazwa użytkownika"}
            inputStyling={"focus:border-custom-orange-200 rounded-xl px-2"}
            onChangeAction={(event) => setUsername(event.target.value)}
            isError={errors !== null}
          />

          <FormItem
            labelData={"Hasło"}
            type={"password"}
            inputStyling={"focus:border-custom-orange-200 rounded-xl px-2"}
            onChangeAction={(event) => setPassword(event.target.value)}
            isError={errors !== null}
          />
          {errorMessage && (
            <p className="mt-4 text-lg text-red-500">{errorMessage}</p>
          )}
          <button
            type={"submit"}
            className="bg-custom-orange-200 mt-8 text-2xl w-[75%] h-[50px] rounded-2xl border-4 border-black text-white uppercase font-bold"
          >
            Zaloguj się
          </button>
        </form>
      </div>
    </AnimatedPage>
  );
};

export default SignIn;
