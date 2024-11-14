import React, { useState } from "react";
import DefaultModal from "../modal/DefaultModal.jsx";
import FormItem from "./FormItem.jsx";
import ButtonWithLink from "../universal/ButtonWithLink.jsx";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import useSendRequestToAdminMutation from "../../hooks/mutations/useSendRequestToAdminMutation.js";
import useIsUsernameUniqueMutation from "../../hooks/mutations/useIsUsernameUniqueMutation.js";
import useIsEmailUniqueMutation from "../../hooks/mutations/useIsEmailUniqueMutation.js";
import useAuthentication from "../../hooks/others/useAuthentication.js";

const AccountFormItem = ({ labelTitle, register, value, errors }) => {
  const { role, userId } = useAuthentication();
  const [editing, setEditing] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [changingEmail, setChangingEmail] = React.useState(
    labelTitle.includes("e-mail"),
  );
  const [changedValue, setChangedValue] = useState("");
  const { sendRequestToAdmin, sendingRequestToAdmin } =
    useSendRequestToAdminMutation(() => {
      toast.success("Wysłano prośbę do admina!");
      setOpenModal(false);
    });
  const { isEmailUnique } = useIsEmailUniqueMutation();
  const { isUsernameUnique } = useIsUsernameUniqueMutation();

  const handleButtonClick = () => {
    setEditing(!editing);
  };

  const checkChangedValue = async () => {
    if (changingEmail) {
      return await isEmailUnique(changedValue);
    } else {
      return await isUsernameUnique(changedValue);
    }
  };

  if (sendingRequestToAdmin) {
    return;
  }

  return (
    <div className="w-full h-auto space-y-2">
      <p className="ml-3 text-xl">{labelTitle}</p>
      <div className="w-full h-[50px] flex flex-col">
        <div className="w-full flex relative">
          <input
            type="text"
            disabled={editing === false}
            defaultValue={value}
            className={` max-lg:w-[90%] lg:w-[80%] h-[60px] border-4 px-4 text-lg text-center focus:outline-none rounded-2xl ${editing ? "border-custom-orange-200" : "border-custom-gray-300"}`}
            {...register}
          />
          <motion.button
            whileHover={{ backgroundColor: "#FF5A5A", color: "#FFFFFF" }}
            style={{ backgroundColor: "#D0D0D0", color: "#111111" }}
            initial={{ backgroundColor: "#D0D0D0", color: "#111111" }}
            animate={
              editing
                ? { backgroundColor: "#FF5A5A", color: "#FFFFFF" }
                : { backgroundColor: "#D0D0D0", color: "#111111" }
            }
            onClick={() => {
              if (role === "ADMIN" || labelTitle.includes("Numer")) {
                handleButtonClick();
              } else {
                setOpenModal(true);
              }
            }}
            className={`absolute font-bold ml-auto -translate-x-4 inset-0 w-[100px] h-[60px] rounded-2xl`}
          >
            ZMIEŃ
          </motion.button>
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
                    sendRequestToAdmin({
                      requestType: changingEmail
                        ? "EMAIL_CHANGING"
                        : "USERNAME_CHANGING",
                      userEnteredValueToChange: changedValue,
                      userId: userId,
                    });
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
