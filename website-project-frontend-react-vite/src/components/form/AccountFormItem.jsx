import React, { useContext, useState } from "react";
import { AuthContext } from "../../helpers/provider/AuthProvider.jsx";
import DefaultModal from "../modal/DefaultModal.jsx";
import FormItem from "./FormItem.jsx";
import ButtonWithLink from "../universal/ButtonWithLink.jsx";
import { useMutation, useQuery } from "react-query";
import { handleSendingNewRequest } from "../../helpers/api-integration/RequestsToAdminHandling.js";
import toast from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import {
  checkEmailIsUnique,
  checkUsernameIsUnique,
} from "../../helpers/api-integration/UserDataHandling.js";

const AccountFormItem = ({ labelTitle, register, value, errors }) => {
  const { role, userId } = useContext(AuthContext);
  const [editing, setEditing] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [changingEmail, setChangingEmail] = React.useState(
    labelTitle.includes("e-mail"),
  );
  const [changedValue, setChangedValue] = useState("");

  const { mutate: sendRequestToAdmin, isLoading: sendingRequestToAdmin } =
    useMutation({
      mutationKey: ["sendRequestToAdmin", userId],
      mutationFn: () =>
        handleSendingNewRequest({
          requestType: changingEmail ? "EMAIL_CHANGING" : "USERNAME_CHANGING",
          userEnteredValueToChange: changedValue,
          userId: userId,
        }),
      onSuccess: () => {
        toast.success("Wysłano prośbę do admina!");
        setOpenModal(false);
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const { refetch: isUsernameUnique } = useQuery(
    ["isUsernameUnique", changedValue],
    () => checkUsernameIsUnique(changedValue),
    {
      enabled: false,
    },
  );

  const { refetch: isEmailUnique } = useQuery(
    ["isEmailUnique", changedValue],
    () => checkEmailIsUnique(changedValue),
    {
      enabled: false,
    },
  );

  const handleButtonClick = () => {
    setEditing(!editing);
  };

  const checkChangedValue = async () => {
    if (changingEmail) {
      const { data } = await isEmailUnique();
      console.log(data);
      return data;
    } else {
      const { data } = await isUsernameUnique();
      console.log(data);
      return data;
    }
  };

  if (sendingRequestToAdmin) {
    return;
  }

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
            onClick={() => {
              if (role === "ADMIN" || labelTitle.includes("Numer")) {
                handleButtonClick();
              } else {
                setOpenModal(true);
              }
            }}
            className={`absolute font-bold ml-auto -translate-x-4 inset-0 w-[100px] h-[60px] rounded-2xl ${editing ? "bg-custom-orange-200 text-white" : "bg-custom-gray-300"}`}
          >
            ZMIEŃ
          </button>
        </div>
        {errors !== null && (
          <p className="text-lg text-red-500 mr-4">{errors}</p>
        )}
      </div>
      <AnimatePresence>
        {openModal && (
          <DefaultModal
            title={
              changingEmail
                ? "Zmiana adresu e-mail"
                : "Zmiana nazwy użytkownika"
            }
            subtitle={`Aby zmienić ${changingEmail ? "adres e-mail" : "nazwę użytkownika"} zostanie wysłana prośba do admina. Jeżeli admin zaakceptuje prośbę, dane zostaną zmienione.`}
          >
            <FormItem
              labelData={`Wprowadź ${changingEmail ? "nowy adres e-mail" : "nową nazwę użytkownika"}`}
              containerStyling={"w-full"}
              type={changingEmail ? "email" : "text"}
              inputStyling={
                "rounded-xl w-full px-2 focus:border-custom-orange-200"
              }
              defaultValue={changedValue}
              onChangeAction={(e) => setChangedValue(e.target.value)}
            />
            <div className={"flex gap-8"}>
              <ButtonWithLink
                title={"Akceptuj"}
                onClick={async () => {
                  if ((await checkChangedValue()) === true) {
                    sendRequestToAdmin();
                  } else {
                    toast.error(
                      `${changingEmail ? "Wprowadzony adres e-mail" : "Wprowadzona nazwa użytkownika"} już istnieje w bazie!`,
                    );
                  }
                }}
                className={
                  "bg-custom-orange-200 h-[75px] rounded-2xl border-4 border-black uppercase text-2xl text-white w-[200px]"
                }
              />
              <ButtonWithLink
                title={"Anuluj"}
                onClick={() => setOpenModal(false)}
                className={
                  "bg-custom-orange-200 h-[75px] rounded-2xl border-4 border-black uppercase text-2xl text-white w-[200px]"
                }
              />
            </div>
          </DefaultModal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountFormItem;
