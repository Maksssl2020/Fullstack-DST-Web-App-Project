import React, { useState } from "react";
import MainBannerWithoutLogo from "../components/universal/MainBannerWithoutLogo";
import FormItem from "../components/form/FormItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== retypePassword) {
      setErrors({ retypePassword: "Hasła powinny być identyczne!" });
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/v1/auth/register", {
        username,
        email,
        password,
      });
      navigate("/");
    } catch (error) {
      const errorsMessages = {};
      let errorData = [];

      if (error.response.data.validationErrors) {
        errorData.push(error.response.data.validationErrors);
      }
      if (error.response.data.error) {
        errorData.push(error.response.data.error);
      }

      errorData.forEach((error) => {
        if (error.toString().includes("Password")) {
          errorsMessages.password = "Hasło musi mieć conajmniej 8 znaków!";
        }
        if (error.toString().includes("Email cannot be blank")) {
          errorsMessages.email = "Nieprawidłowy e-mail!";
        }
        if (error.toString().includes("(email)=")) {
          errorsMessages.email = "Podany adres e-mail istnieje w bazie!";
        }
        if (error.toString().includes("Username cannot be blank")) {
          errorsMessages.username = "Nieprawidłowa nazwa użytkownika!";
        }
        if (error.toString().includes("(username)=")) {
          errorsMessages.username =
            "Podana nazwa użytkownika istnieje w bazie!";
        }
      });

      console.log(errorsMessages);
      setErrors(errorsMessages);
    }
  };

  console.log(errors);

  return (
    <div className="font-lato w-full bg-custom-gray-300 flex flex-col items-center justify-center h-auto">
      <MainBannerWithoutLogo bannerTitle={"Zarejestruj się"} />
      <form
        onSubmit={handleRegister}
        className="w-[850px] p-8 flex flex-col items-center rounded-2xl my-12 h-auto bg-custom-gray-100"
      >
        <FormItem
          labelData={"Nazwa użytkownika"}
          inputStyling={"focus:border-custom-orange-100"}
          onChangeAction={(event) => setUsername(event.target.value)}
          isError={errors.username !== undefined}
        />
        {errors.username && (
          <p className="mt-2 text-lg text-red-500">{errors.username}</p>
        )}
        <FormItem
          labelData={"e-mail"}
          type={"email"}
          inputStyling={"focus:border-custom-orange-100"}
          onChangeAction={(event) => setEmail(event.target.value)}
          isError={errors.email !== undefined}
        />
        {errors.email && (
          <p className="mt-2 text-lg text-red-500">{errors.email}</p>
        )}
        <FormItem
          labelData={"Hasło"}
          type={"password"}
          inputStyling={"focus:border-custom-orange-100"}
          onChangeAction={(event) => setPassword(event.target.value)}
          isError={errors.password !== undefined}
        />
        {errors.password && (
          <p className="mt-2 text-lg text-red-500">{errors.password}</p>
        )}
        <FormItem
          labelData={"Powtórz hasło"}
          type={"password"}
          inputStyling={"focus:border-custom-orange-100"}
          onChangeAction={(event) => setRetypePassword(event.target.value)}
          isError={errors.retypePassword !== undefined}
        />
        {errors.retypePassword && (
          <p className="mt-2 text-lg text-red-500">{errors.retypePassword}</p>
        )}
        <button
          type={"submit"}
          className="bg-custom-orange-200 mt-8 text-2xl w-[75%] h-[50px] rounded-full text-white uppercase font-bold"
        >
          Zarejestruj się
        </button>
      </form>
    </div>
  );
};

export default SignUp;
