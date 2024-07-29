import React from "react";

const AccountFormItem = ({
  labelTitle,
  inputValue,
  inputFunction,
  buttonFunction,
}) => {
  return (
    <div className="w-full h-auto space-y-2">
      <p className="ml-3 text-xl">{labelTitle}</p>
      <div className="w-full flex relative">
        <input
          type="text"
          value={inputValue}
          disabled
          className="w-[80%] h-[60px] border-4 border-custom-gray-300 px-4 text-lg text-center focus:outline-none rounded-2xl"
          onChange={(event) => inputFunction(event.target.value)}
        />
        <button className="absolute font-bold ml-auto inset-0 w-[100px] h-[60px] rounded-2xl bg-custom-gray-300">
          ZMIEŃ
        </button>
      </div>
    </div>
  );
};

export default AccountFormItem;
