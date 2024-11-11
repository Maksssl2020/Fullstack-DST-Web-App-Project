import { useState } from "react";
import MainBannerWithoutLogo from "../components/universal/MainBannerWithoutLogo.jsx";
import FormItem from "../components/form/FormItem.jsx";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import toast from "react-hot-toast";
import useLoginMutation from "../hooks/mutations/useLoginMutation.js";
import { useForm } from "react-hook-form";
import Spinner from "../components/universal/Spinner.jsx";
import DefaultModal from "../components/modal/DefaultModal.jsx";
import { AnimatePresence } from "framer-motion";
import useResetUserPasswordMutation from "../hooks/mutations/useResetUserPasswordMutation.js";
import { translateErrorsForUsers } from "../errors/TranslateErrorsForUsers.js";

const SignIn = () => {
  const { register, formState, reset, handleSubmit } = useForm();
  const { errors } = formState;
  const [serviceErrors, setServiceErrors] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { loginUser, loggingUser } = useLoginMutation(() => {
    toast.success("Logowanie udane!");
    reset();
    navigate("/");
  }, setServiceErrors);
  const { resetUserPassword, resettingUserPassword } =
    useResetUserPasswordMutation();

  let errorMessage;

  if (serviceErrors?.includes("locked")) {
    errorMessage = "Konto zostało zbanowane!";
  } else if (serviceErrors?.includes("credentials")) {
    errorMessage = "Nieprawidłowa nazwa użytkownika lub hasło!";
  } else if (serviceErrors?.includes("Account isn't activated")) {
    errorMessage = "Konto nie zostało aktywowane! Sprawdź e-mail.";
  }

  if (loggingUser || resettingUserPassword) {
    return <Spinner />;
  }

  const handleLoginSubmit = (data) => {
    if (!isModalOpen) {
      loginUser({ username: data.username, password: data.password });
    }
  };

  const handlePasswordReset = (data) => {
    console.log(data);
    resetUserPassword(data.email);
    setIsModalOpen(false);
  };

  console.log(errors.email);
  console.log(errors);

  return (
    <AnimatedPage>
      <div className="font-lato py-8 w-full bg-custom-gray-300 flex flex-col items-center justify-center h-auto">
        <MainBannerWithoutLogo bannerTitle={"Zaloguj się"} />
        <form
          onSubmit={handleSubmit((data) => handleLoginSubmit(data))}
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
            <p className="mt-4 text-lg text-red-500">
              {translateErrorsForUsers(serviceErrors)}
            </p>
          )}
          <button
            type={"submit"}
            className="bg-custom-orange-200 mt-8 text-2xl w-[75%] h-[50px] rounded-2xl border-2 border-black text-white uppercase font-bold"
          >
            Zaloguj się
          </button>
          <p
            onClick={() => setIsModalOpen(true)}
            className={"w-full h-auto text-center text-xl mt-6"}
          >
            Nie pamiętam&nbsp;
            <span className={"text-custom-orange-200 hover:cursor-pointer"}>
              hasła
            </span>
            .
          </p>
        </form>

        <AnimatePresence>
          {isModalOpen && (
            <DefaultModal
              title={"Reset hasła"}
              subtitle={
                "Wpisz e-mail, który został podany przy tworzeniu konta. Wyślemy na niego link do ustawienia nowego hasła."
              }
            >
              <form
                onSubmit={handleSubmit(handlePasswordReset)}
                className={"w-full h-auto flex flex-col gap-4"}
              >
                <FormItem
                  type={"email"}
                  containerStyling={"text-xl w-full mt-5"}
                  inputStyling={
                    "focus:border-custom-orange-200 rounded-xl px-2"
                  }
                  labelData={"Adres e-mail:"}
                  register={
                    isModalOpen && {
                      ...register("email", {
                        required: true,
                      }),
                    }
                  }
                />
                <div className={"w-full h-[50px] flex justify-between"}>
                  <button
                    type={"button"}
                    onClick={() => setIsModalOpen(false)}
                    className={
                      "w-[48%] h-full rounded-xl uppercase border-2 border-black bg-custom-orange-200 font-bold text-white text-2xl"
                    }
                  >
                    Anuluj
                  </button>
                  <button
                    type={"submit"}
                    disabled={errors?.email !== undefined}
                    className={
                      "w-[48%] h-full rounded-xl uppercase border-2 border-black bg-custom-orange-200 font-bold text-white text-2xl"
                    }
                  >
                    Resetuj
                  </button>
                </div>
              </form>
            </DefaultModal>
          )}
        </AnimatePresence>
      </div>
    </AnimatedPage>
  );
};

export default SignIn;
