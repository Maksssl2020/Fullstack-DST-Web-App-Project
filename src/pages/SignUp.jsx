import React, { useState } from "react";
import MainBannerWithoutLogo from "../components/universal/MainBannerWithoutLogo";
import FormItem from "../components/form/FormItem";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/v1/auth/register", {
        username,
        email,
        password,
      });
      alert("User successfully registered!");
    } catch (error) {
      console.error("There was an error registering!", error);
    }
  };

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
        />
        <FormItem
          labelData={"e-mail"}
          type={"email"}
          inputStyling={"focus:border-custom-orange-100"}
          onChangeAction={(event) => setEmail(event.target.value)}
        />
        <FormItem
          labelData={"Hasło"}
          type={"password"}
          inputStyling={"focus:border-custom-orange-100"}
          onChangeAction={(event) => setPassword(event.target.value)}
        />
        <FormItem
          labelData={"Powtórz hasło"}
          type={"password"}
          inputStyling={"focus:border-custom-orange-100"}
        />

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
