import React from "react";

const AccountFormItem = ({ labelTitle, register, value, errors }) => {
  const [editing, setEditing] = React.useState(false);

  const handleButtonClick = () => {
    setEditing(!editing);
  };

  return (
    <div className="w-full h-auto space-y-2">
      <p className="ml-3 text-xl">{labelTitle}</p>
      <div className="w-full h-[50px] flex items-center flex-col">
        <div className="w-full flex relative">
          <input
            type="text"
            disabled={editing === false}
            defaultValue={value}
            className={`w-[80%] h-[60px] border-4 px-4 text-lg text-center focus:outline-none rounded-2xl ${editing ? "border-custom-orange-200" : "border-custom-gray-300"}`}
            {...register}
          />
          <button
            onClick={handleButtonClick}
            className={`absolute font-bold ml-auto -translate-x-4 inset-0 w-[100px] h-[60px] rounded-2xl ${editing ? "bg-custom-orange-200 text-white" : "bg-custom-gray-300"}`}
          >
            ZMIEŃ
          </button>
        </div>
        {errors !== null && (
          <p className="text-lg text-red-500 mr-4">{errors}</p>
        )}
      </div>
    </div>
  );
};

export default AccountFormItem;
