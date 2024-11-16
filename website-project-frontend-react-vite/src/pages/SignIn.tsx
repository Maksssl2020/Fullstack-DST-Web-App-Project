import React, { useState } from "react";
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
import { LoginRequest } from "../models/LoginRequest";

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

  const handleLoginSubmit = (data: LoginRequest) => {
    if (!isModalOpen) {
      loginUser({ username: data.username, password: data.password });
    }
  };

  const handlePasswordReset = (email: string) => {
    console.log(email);
    resetUserPassword(email);
    setIsModalOpen(false);
  };

  console.log(errors.email);
  console.log(errors);

  return (
    <AnimatedPage>
      <div className="flex h-auto w-full flex-col items-center justify-center bg-custom-gray-300 py-8 font-lato">
        <MainBannerWithoutLogo bannerTitle={"Zaloguj się"} />
        <form
          onSubmit={handleSubmit((data) =>
            handleLoginSubmit({
              username: data.username,
              password: data.password,
            }),
          )}
          className="my-12 flex h-auto w-[850px] flex-col items-center rounded-2xl bg-custom-gray-100 p-8"
        >
          <FormItem
            label={"Nazwa użytkownika"}
            inputClassname={"focus:border-custom-orange-200 rounded-xl px-2"}
            register={{
              ...register("username", {
                required: true,
              }),
            }}
          />

          <FormItem
            label={"Hasło"}
            type={"password"}
            inputClassname={"focus:border-custom-orange-200 rounded-xl px-2"}
            register={{
              ...register("password", {
                required: true,
              }),
            }}
          />
          {errorMessage && (
            <p className="mt-4 text-lg text-red-500">
              {translateErrorsForUsers(serviceErrors)}
            </p>
          )}
          <button
            type={"submit"}
            className="mt-8 h-[50px] w-[75%] rounded-2xl border-2 border-black bg-custom-orange-200 text-2xl font-bold uppercase text-white"
          >
            Zaloguj się
          </button>
          <p
            onClick={() => setIsModalOpen(true)}
            className={"mt-6 h-auto w-full text-center text-xl"}
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
                onSubmit={handleSubmit((data) =>
                  handlePasswordReset(data.email),
                )}
                className={"flex h-auto w-full flex-col gap-4"}
              >
                <FormItem
                  type={"email"}
                  containerClassname={"text-xl w-full mt-5"}
                  inputClassname={
                    "focus:border-custom-orange-200 rounded-xl px-2"
                  }
                  label={"Adres e-mail:"}
                  register={
                    isModalOpen && {
                      ...register("email", {
                        required: true,
                      }),
                    }
                  }
                />
                <div className={"flex h-[50px] w-full justify-between"}>
                  <button
                    type={"button"}
                    onClick={() => setIsModalOpen(false)}
                    className={
                      "h-full w-[48%] rounded-xl border-2 border-black bg-custom-orange-200 text-2xl font-bold uppercase text-white"
                    }
                  >
                    Anuluj
                  </button>
                  <button
                    type={"submit"}
                    disabled={errors?.email !== undefined}
                    className={
                      "h-full w-[48%] rounded-xl border-2 border-black bg-custom-orange-200 text-2xl font-bold uppercase text-white"
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
