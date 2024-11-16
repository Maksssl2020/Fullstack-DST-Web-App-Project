import React, { ChangeEventHandler } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type FormItemProps = {
  label: string;
  placeholder?: string;
  type?: string;
  containerClassname?: string;
  inputClassname?: string;
  register?: UseFormRegisterReturn<string>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  errors?: string | undefined;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  defaultValue?: string;
};

const FormItem = ({
  label,
  placeholder,
  type = "text",
  containerClassname = "mt-3 w-[75%] gap-2 flex flex-col",
  inputClassname = "",
  register,
  onChange,
  errors,
  onKeyDown,
  defaultValue,
}: FormItemProps) => {
  return (
    <div className={containerClassname}>
      <div className="h-full w-full space-y-2">
        <label className="ml-3">{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          className={`h-[40px] w-full border-2 border-black placeholder:text-black focus:outline-none ${inputClassname} ${errors && "border-red-500"}`}
          onChange={onChange}
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
