import React, { useMemo } from "react";
import MainBannerWithoutLogo from "../components/universal/MainBannerWithoutLogo.jsx";
import FormItem from "../components/form/FormItem.jsx";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRegistrationSchema } from "../helpers/ValidationSchemas.js";
import Spinner from "../components/universal/Spinner.jsx";
import toast from "react-hot-toast";
import useRegisterMutation from "../hooks/mutations/useRegisterMutation.js";
import { getSignUpFormData } from "../data/SignUpFormData";

const SignUp = () => {
  const { register, handleSubmit, setError, formState } = useForm({
    resolver: yupResolver(userRegistrationSchema),
  });
  const { errors } = formState;
  const navigate = useNavigate();
  const { registerUser, registeringUser } = useRegisterMutation(() => {
    toast.success("Wysłaliśmy wiadomość e-mail z linkiem aktywującym konto!");
    navigate("/");
  }, setError);

  const formData = useMemo(() => {
    return getSignUpFormData(errors);
  }, [errors]);

  if (registeringUser) {
    return <Spinner />;
  }

  return (
    <AnimatedPage>
      <div className="flex h-auto w-full flex-col items-center justify-center bg-custom-gray-300 pt-8 font-lato">
        <MainBannerWithoutLogo bannerTitle={"Zarejestruj się"} />
        <form
          onSubmit={handleSubmit((data) =>
            registerUser({
              firstName: data.firstName,
              lastName: data.lastName,
              username: data.username,
              email: data.email,
              dateOfBirth: data.dateOfBirth,
              password: data.password,
            }),
          )}
          className="my-12 flex h-auto w-[850px] flex-col items-center rounded-2xl bg-custom-gray-100 p-8"
        >
          {formData.map((data, index) => (
            <FormItem
              key={index}
              label={data.title}
              type={data.type}
              inputClassname={"focus:border-custom-orange-200 rounded-xl px-2"}
              register={{ ...register(data.dataName) }}
              errors={data.errors}
            />
          ))}
          <button
            type="submit"
            className="mt-8 h-[50px] w-[75%] rounded-2xl border-4 border-black bg-custom-orange-200 text-2xl font-bold uppercase text-white"
          >
            Zarejestruj się
          </button>
        </form>
      </div>
    </AnimatedPage>
  );
};

export default SignUp;
