import React from "react";

const FormItem = ({ labelData, placeholderData }) => {
  return (
    <div className="mt-3 w-[75%] gap-2 flex flex-col">
      <p className="ml-3">{labelData}</p>
      <input
        placeholder={placeholderData}
        className="w-full px-2 focus:outline-none placeholder:text-black h-[40px] rounded-xl border-2 border-black"
      />
    </div>
  );
};

export default FormItem;
