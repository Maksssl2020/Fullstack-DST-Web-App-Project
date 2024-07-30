import React from "react";
import AccountFormItem from "./AccountFormItem";
import { DateParser, PeriodOfDays } from "../../helpers/Date";

const AccountBasicDataForm = ({
  username,
  setUsername,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  accountCreationDate,
  updateErrors,
}) => {
  const periodOfDays = PeriodOfDays(accountCreationDate);

  const formData = [
    {
      title: "Nazwa użytkownika:",
      value: username,
      function: setUsername,
      error: updateErrors.username,
    },
    {
      title: "Adres e-mail:",
      value: email,
      function: setEmail,
      error: updateErrors.email,
    },
    {
      title: "Numer telefonu:",
      value: phoneNumber === null ? "" : phoneNumber,
      function: setPhoneNumber,
      error: updateErrors.phoneNumber,
    },
  ];

  return (
    <div className="w-[55%] h-full flex flex-col justify-center gap-14 p-4 z-0">
      {formData.map((data, index) => (
        <AccountFormItem
          key={index}
          labelTitle={data.title}
          inputValue={data.value}
          inputFunction={data.function}
          errors={data.error}
        />
      ))}
      <div className="w-full h-auto space-y-2">
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
