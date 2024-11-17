import React from "react";
import useAuthentication from "../../hooks/others/useAuthentication.js";
import { UseFormRegisterReturn } from "react-hook-form";
import AccountFormItemAnimatedButton from "../button/AccountFormItemAnimatedButton";
import AccountFormItemModal from "../modal/AccountFormItemModal";

type AccountFormItemProps = {
  label: string;
  dataType: string;
  register?: UseFormRegisterReturn<string>;
  errors?: string | undefined;
};

const AccountFormItem = ({
  label,
  dataType,
  register,
  errors,
}: AccountFormItemProps) => {
  const { role } = useAuthentication();
  const [editing, setEditing] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="h-auto w-full space-y-2">
      <p className="ml-3 text-xl">{label}</p>
      <div className="flex h-[50px] w-full flex-col">
        <div className="relative flex w-full">
          <input
            type="text"
            disabled={!editing}
            className={`h-[60px] rounded-2xl border-4 px-4 text-center text-lg focus:outline-none max-lg:w-[90%] lg:w-[80%] ${editing ? "border-custom-orange-200" : "border-custom-gray-300"}`}
            {...register}
          />
        </div>
        <AccountFormItemAnimatedButton
          isEditing={editing}
          onClick={() => {
            if (role === "ADMIN" || dataType === "phoneNumber") {
              setEditing(!editing);
            } else {
              setIsModalOpen(true);
            }
          }}
        />
        {errors !== null && (
          <p className="mr-4 text-lg text-red-500">{errors}</p>
        )}
      </div>

      <AccountFormItemModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(!isModalOpen)}
        type={dataType === "email" ? "email" : "text"}
        label={
          dataType === "email"
            ? "Wprowadź nowy adres e-mail"
            : "Wprowadź nową nazwę użytkownika"
        }
        title={"Zmiana danych indentyfikacyjnych"}
        subtitle={
          "Aby zmienić dane indentyfikacyjne zostanie wysłana prośba do admina. Jeźeli wyrazi zgodę, dane zostaną zmienione."
        }
        errorMessage={
          dataType === "email"
            ? "Wprowadzony e-mail już istnieje w bazie!"
            : "Wprowadzona nazwa użytkownika już istnieje w bazie!"
        }
      />
    </div>
  );
};

export default AccountFormItem;
