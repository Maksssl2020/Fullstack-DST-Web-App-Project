import React from "react";

const FormItem = ({
  labelData,
  placeholderData,
  type = "text",
  containerStyling = "",
  inputStyling = "",
  onChangeAction = undefined,
  errors = undefined,
}) => {
  return (
    <div
      className={"mt-3 w-[75%] gap-2 flex flex-col".concat(
        " " + containerStyling,
      )}
    >
      <p className="ml-3">{labelData}</p>
      <input
        type={type}
        placeholder={placeholderData}
        className={`w-full focus:outline-none placeholder:text-black h-[40px] border-2 border-black ${inputStyling} ${errors && "border-red-500"}`}
        onChange={onChangeAction}
      />
      {errors && <p className="mt-2 text-lg text-red-500">{errors}</p>}
    </div>
  );
};

export default FormItem;
