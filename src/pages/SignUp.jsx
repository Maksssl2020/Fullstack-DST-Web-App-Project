import React from "react";
import MainBannerWithoutLogo from "../components/universal/MainBannerWithoutLogo";
import FormItem from "../components/form/FormItem";

const SignUp = () => {
  return (
    <div className="font-lato w-full bg-custom-gray-300 flex flex-col items-center justify-center h-auto">
      <MainBannerWithoutLogo bannerTitle={"Zarejestruj się"} />
      <div className="w-[850px] p-8 flex flex-col items-center rounded-2xl my-12 h-auto bg-custom-gray-100">
        <FormItem
          labelData={"Imię"}
          inputStyling={"focus:border-custom-orange-100"}
        />
        <FormItem
          labelData={"Nazwisko"}
          inputStyling={"focus:border-custom-orange-100"}
        />
        <FormItem
          labelData={"Nazwa użytkownika"}
          inputStyling={"focus:border-custom-orange-100"}
        />
        <FormItem
          labelData={"e-mail"}
          type={"email"}
          inputStyling={"focus:border-custom-orange-100"}
        />
        <FormItem
          labelData={"Hasło"}
          type={"password"}
          inputStyling={"focus:border-custom-orange-100"}
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
      </div>
    </div>
  );
};

export default SignUp;
