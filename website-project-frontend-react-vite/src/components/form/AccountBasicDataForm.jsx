import React from "react";
import AccountFormItem from "./AccountFormItem.jsx";
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
    <div className="xl:w-[55%] max-xl:w-full h-full max-lg:flex max-lg:flex-col max-lg:gap-4 xl:flex xl:flex-col lg:grid lg:grid-cols-2 xl:justify-center gap-14 p-4 z-0">
      {formData.map((data, index) => (
        <div key={index} className={`w-full  ${index % 2 !== 0 && "lg:ml-4"}`}>
          <AccountFormItem
            key={index}
            labelTitle={data.title}
            register={data.register}
            value={data.value}
            errors={data.error}
          />
        </div>
      ))}
      <div className="w-full h-auto space-y-2 lg:ml-4">
        <p className="ml-3 text-xl">Data założenia konta:</p>
        <div className="w-full flex relative">
          <div className="w-[60%] h-[60px] border-4 flex justify-center items-center border-custom-gray-300 text-lg rounded-2xl">
            {DateParser(accountCreationDate)} r.
          </div>
          <div className="absolute ml-auto gap-1 -translate-x-4 inset-0 w-[45%] h-[60px] items-center flex justify-center rounded-2xl bg-custom-gray-300">
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
