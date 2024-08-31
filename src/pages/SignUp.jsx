import React from "react";
import MainBannerWithoutLogo from "../components/universal/MainBannerWithoutLogo";
import FormItem from "../components/form/FormItem";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../animation/AnimatedPage";
import axios from "../helpers/AxiosConfig";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { handleRegister } from "../helpers/api-integration/AuthenticationHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRegistrationSchema } from "../helpers/ValidationSchemas";
import Spinner from "../components/universal/Spinner";
import toast from "react-hot-toast";

const SignUp = () => {
  const { register, handleSubmit, getValues, setError, formState } = useForm({
    resolver: yupResolver(userRegistrationSchema),
  });
  const { errors } = formState;
  const navigate = useNavigate();

  const { mutate: registerUser, isLoading: registeringUser } = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: () =>
      handleRegister({
        firstName: getValues().firstName,
        lastName: getValues().lastName,
        username: getValues().username,
        email: getValues().email,
        dateOfBirth: getValues().dateOfBirth,
        password: getValues().password,
      }),
    onSuccess: () => {
      toast.success("Wysłaliśmy wiadomość e-mail z linkiem aktywującym konto!");
      navigate("/");
    },
    onError: (error) => {
      if (error?.response?.data?.errorMessage?.includes("(email)=")) {
        setError("email", {
          type: "manual",
          message: "Podany adres e-mail istnieje w bazie!",
        });
      }
      if (error?.response?.data?.errorMessage?.includes("(username)=")) {
        setError("username", {
          type: "manual",
          message: "Podana nazwa użytkownika istnieje w bazie!",
        });
      }
    },
  });

  const formData = [
    {
      title: "Imię",
      type: "text",
      dataName: "firstName",
      errors: errors?.firstName?.message,
    },
    {
      title: "Nazwisko",
      type: "text",
      dataName: "lastName",
      errors: errors?.lastName?.message,
    },
    {
      title: "Nazwa użytkownika",
      type: "text",
      dataName: "username",
      errors: errors?.username?.message,
    },
    {
      title: "E-mail",
      type: "email",
      dataName: "email",
      errors: errors?.email?.message,
    },
    {
      title: "Data urodzenia",
      type: "date",
      dataName: "dateOfBirth",
      errors: errors?.dateOfBirth?.message,
    },
    {
      title: "Hasło",
      type: "password",
      dataName: "password",
      errors: errors?.password?.message,
    },
    {
      title: "Powtórz hasło",
      type: "password",
      dataName: "retypePassword",
      errors: errors?.retypePassword?.message,
    },
  ];

  if (registeringUser) {
    return <Spinner />;
  }

  return (
    <AnimatedPage>
      <div className="font-lato pt-8 w-full bg-custom-gray-300 flex flex-col items-center justify-center h-auto">
        <MainBannerWithoutLogo bannerTitle={"Zarejestruj się"} />
        <form
          onSubmit={handleRegister}
          className="w-[850px] p-8 flex flex-col items-center rounded-2xl my-12 h-auto bg-custom-gray-100"
        >
          {formData.map((data, index) => (
            <FormItem
              key={index}
              labelData={data.title}
              type={data.type}
              inputStyling={"focus:border-custom-orange-200 rounded-xl px-2"}
              register={{ ...register(data.dataName) }}
              errors={data.errors}
            />
          ))}
          <button
            type={"submit"}
            onClick={handleSubmit(registerUser)}
            className="bg-custom-orange-200 mt-8 text-2xl w-[75%] h-[50px] rounded-2xl border-4 border-black text-white uppercase font-bold"
          >
            Zarejestruj się
          </button>
        </form>
      </div>
    </AnimatedPage>
  );
};

export default SignUp;
