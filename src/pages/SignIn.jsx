import React, { useState } from "react";
import MainBannerWithoutLogo from "../components/universal/MainBannerWithoutLogo";
import FormItem from "../components/form/FormItem";
import axios from "axios";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!username) errors.username = "Username cannot be blank!";
    if (!password) errors.password = "Password cannot be blank!";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        { username: username, password: password },
      );
      localStorage.setItem("token", response.data.token);
      alert("User successfully logged in!");
    } catch (error) {
      console.error("There was an error logining!", error);
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
        />
        {errors.username && <p>{errors.username}</p>}

        <FormItem
          labelData={"Hasło"}
          type={"password"}
          inputStyling={"focus:border-custom-orange-100"}
          onChangeAction={(event) => setPassword(event.target.value)}
        />
        {errors.password && <p>{errors.password}</p>}
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
