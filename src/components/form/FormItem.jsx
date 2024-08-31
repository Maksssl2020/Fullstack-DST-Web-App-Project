import React from "react";

const FormItem = ({
  labelData,
  placeholderData,
  type = "text",
  containerStyling = "mt-3 w-[75%] gap-2 flex flex-col",
  inputStyling = "",
  register = undefined,
  onChangeAction = undefined,
  errors = undefined,
  onKeyDown = undefined,
  defaultValue = undefined,
}) => {
  return (
    <div className={containerStyling}>
      <div className="w-full h-full space-y-2">
        <label className="ml-3">{labelData}</label>
        <input
          type={type}
          placeholder={placeholderData}
          className={`w-full focus:outline-none placeholder:text-black h-[40px] border-2 border-black ${inputStyling} ${errors && "border-red-500"}`}
          onChange={onChangeAction}
          onKeyDown={onKeyDown}
          defaultValue={defaultValue}
          {...register}
        />
        {errors && <p className="ml-3 mt-2 text-lg text-red-500">{errors}</p>}
      </div>
    </div>
  );
};

export default FormItem;
