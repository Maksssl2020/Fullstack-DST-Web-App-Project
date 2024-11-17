import React from "react";
import { DateParser, PeriodOfDays } from "../../helpers/Date.js";

const AccountBasicDataForm = ({
  register,
  userData,
  accountCreationDate,
  errors,
}) => {
  const periodOfDays = PeriodOfDays(accountCreationDate);

  const formData = [
    {
      title: "Nazwa użytkownika:",
      value: userData.username,
      register: {
        ...register("username", {
          required: "Nazwa użytkownika nie może być pusta!",
        }),
      },
      error: errors?.username?.message,
    },
    {
      title: "Adres e-mail:",
      value: userData.email,
      register: {
        ...register("email", {
          required: "E-mail nie może być pusty!",
        }),
      },
      error: errors?.email?.message,
    },
    {
      title: "Numer telefonu:",
      value: userData.phoneNumber,
      register: { ...register("phoneNumber") },
      error: errors?.phoneNumber?.message,
    },
  ];

  return (
    <div className="z-0 h-full gap-14 p-4 max-xl:w-full max-lg:flex max-lg:flex-col max-lg:gap-4 lg:grid lg:grid-cols-2 xl:flex xl:w-full xl:flex-col xl:justify-center">
      {/*{formData.map((data, index) => (*/}
      {/*  <div*/}
      {/*    key={index}*/}
      {/*    className={`w-full  ${index % 2 !== 0 && "lg:ml-4 xl:ml-0"}`}*/}
      {/*  >*/}
      {/*    <AccountFormItem*/}
      {/*      key={index}*/}
      {/*      labelTitle={data.title}*/}
      {/*      register={data.register}*/}
      {/*      value={data.value}*/}
      {/*      errors={data.error}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*))}*/}
      <div className="h-auto w-full space-y-2 lg:ml-4 xl:ml-0">
        <p className="ml-3 text-xl">Data założenia konta:</p>
        <div className="relative flex w-full">
          <div className="flex h-[60px] w-[60%] items-center justify-center rounded-2xl border-4 border-custom-gray-300 text-lg">
            {DateParser(accountCreationDate)} r.
          </div>
          <div className="absolute inset-0 ml-auto flex h-[60px] w-[45%] -translate-x-4 items-center justify-center gap-1 rounded-2xl bg-custom-gray-300">
            <span className="font-bold">{periodOfDays}</span>
            {periodOfDays !== "Dzisiaj" && (
              <span className="italic">
                {periodOfDays === 1 ? "dzień temu" : "dni temu"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountBasicDataForm;
