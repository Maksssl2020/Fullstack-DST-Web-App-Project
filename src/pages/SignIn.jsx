import React, { useContext, useState } from "react";
import MainBannerWithoutLogo from "../components/universal/MainBannerWithoutLogo";
import FormItem from "../components/form/FormItem";
import axios from "../helpers/AxiosConfig";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/provider/AuthProvider";

const SignIn = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/auth/login", {
        username: username,
        password: password,
      });
      login(response.data.token);
      navigate("/");
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <div className="font-lato w-full bg-custom-gray-300 flex flex-col items-center justify-center h-auto">
      <MainBannerWithoutLogo bannerTitle={"Zaloguj się"} />
      <form
        onSubmit={handleLogin}
        className="w-[850px] p-8 flex flex-col items-center rounded-2xl my-12 h-auto bg-custom-gray-100"
      >
        <FormItem
          labelData={"Nazwa użytkownika"}
          inputStyling={"focus:border-custom-orange-100"}
          onChangeAction={(event) => setUsername(event.target.value)}
          isError={errors !== null}
        />

        <FormItem
          labelData={"Hasło"}
          type={"password"}
          inputStyling={"focus:border-custom-orange-100"}
          onChangeAction={(event) => setPassword(event.target.value)}
          isError={errors !== null}
        />
        {errors !== null && (
          <p className="mt-4 text-lg text-red-500">
            {"Nieprawidłowa nazwa użytkownika lub hasło!"}
          </p>
        )}
        <button
          type={"submit"}
          className="bg-custom-orange-200 mt-8 text-2xl w-[75%] h-[50px] rounded-full text-white uppercase font-bold"
        >
          Zaloguj się
        </button>
      </form>
    </div>
  );
};

export default SignIn;
