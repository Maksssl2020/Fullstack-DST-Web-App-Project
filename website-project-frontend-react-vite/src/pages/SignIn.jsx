import { useState } from "react";
import MainBannerWithoutLogo from "../components/universal/MainBannerWithoutLogo.jsx";
import FormItem from "../components/form/FormItem.jsx";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import toast from "react-hot-toast";
import useLoginMutation from "../hooks/mutations/useLoginMutation.js";
import { useForm } from "react-hook-form";
import Spinner from "../components/universal/Spinner.jsx";

const SignIn = () => {
  const { register, reset, handleSubmit } = useForm();
  const [serviceErrors, setServiceErrors] = useState("");
  const navigate = useNavigate();
  const { loginUser, loggingUser } = useLoginMutation(() => {
    toast.success("Logowanie udane!");
    reset();
    navigate("/");
  }, setServiceErrors);

  let errorMessage;

  if (serviceErrors?.includes("locked")) {
    errorMessage = "Konto zostało zbanowane!";
  } else if (serviceErrors?.includes("credentials")) {
    errorMessage = "Nieprawidłowa nazwa użytkownika lub hasło!";
  } else if (serviceErrors?.includes("Account isn't activated")) {
    errorMessage = "Konto nie zostało aktywowane! Sprawdź e-mail.";
  }

  if (loggingUser) {
    return <Spinner />;
  }

  return (
    <AnimatedPage>
      <div className="font-lato py-8 w-full bg-custom-gray-300 flex flex-col items-center justify-center h-auto">
        <MainBannerWithoutLogo bannerTitle={"Zaloguj się"} />
        <form
          onSubmit={handleSubmit((data) =>
            loginUser({ username: data.username, password: data.password }),
          )}
          className="w-[850px] p-8 flex flex-col items-center rounded-2xl my-12 h-auto bg-custom-gray-100"
        >
          <FormItem
            labelData={"Nazwa użytkownika"}
            inputStyling={"focus:border-custom-orange-200 rounded-xl px-2"}
            register={{
              ...register("username", {
                required: true,
              }),
            }}
            isError={serviceErrors !== null}
          />

          <FormItem
            labelData={"Hasło"}
            type={"password"}
            inputStyling={"focus:border-custom-orange-200 rounded-xl px-2"}
            register={{
              ...register("password", {
                required: true,
              }),
            }}
            isError={serviceErrors !== null}
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
