import React from "react";
import { useForm } from "react-hook-form";
import { getUserAccountFormData } from "../../data/UserAccountFormData";
import AccountFormItem from "./AccountFormItem";

const UserAccountForm = ({ preloadedData }) => {
  const { register, getValues, formState } = useForm({
    defaultValues: preloadedData,
  });
  const { errors } = formState;

  const userFormData = getUserAccountFormData(errors);

  return (
    <form
      className={
        "z-0 h-full gap-14 p-4 max-xl:w-full max-lg:flex max-lg:flex-col max-lg:gap-4 lg:grid lg:grid-cols-2 xl:flex xl:w-full xl:flex-col xl:justify-center"
      }
    >
      {userFormData.map((data, index) => (
        <AccountFormItem
          key={index}
          label={data.title}
          dataType={data.dataName}
          errors={data.errors}
          register={{ ...register(data.dataName) }}
        />
      ))}
    </form>
  );
};

export default UserAccountForm;
