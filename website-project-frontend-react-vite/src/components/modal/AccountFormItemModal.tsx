import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import DefaultModal from "./DefaultModal";
import FormItem from "../form/FormItem";
import ButtonWithLink from "../universal/ButtonWithLink";
import useSendRequestToAdminMutation from "../../hooks/mutations/useSendRequestToAdminMutation";
import toast from "react-hot-toast";
import useIsEmailUniqueMutation from "../../hooks/mutations/useIsEmailUniqueMutation";
import useIsUsernameUniqueMutation from "../../hooks/mutations/useIsUsernameUniqueMutation";
import useAuthentication from "../../hooks/others/useAuthentication";

type AccountFormItemModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  subtitle: string;
  label: string;
  type: "email" | "text";
  errorMessage?: string;
};

const AccountFormItemModal = ({
  isOpen,
  closeModal,
  title,
  subtitle,
  label,
  type,
  errorMessage,
}: AccountFormItemModalProps) => {
  const { userId } = useAuthentication();
  const [value, setValue] = useState("");
  const { sendRequestToAdmin, sendingRequestToAdmin } =
    useSendRequestToAdminMutation(() => {
      toast.success("Wysłano prośbę do admina!");
      closeModal(false);
    });
  const { isEmailUnique } = useIsEmailUniqueMutation();
  const { isUsernameUnique } = useIsUsernameUniqueMutation();

  const checkChangedValue = async () => {
    if (type === "email") {
      return await isEmailUnique(value);
    } else {
      return await isUsernameUnique(value);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <DefaultModal title={title} subtitle={subtitle}>
          <FormItem
            label={label}
            containerClassname={"w-full"}
            type={type}
            inputClassname={
              "rounded-xl w-full px-2 focus:border-custom-orange-200"
            }
            onChange={(e) => setValue(e.target.value)}
          />
          <div className={"flex gap-8"}>
            <ButtonWithLink
              title={"Akceptuj"}
              onClick={async () => {
                if ((await checkChangedValue()) === true) {
                  sendRequestToAdmin({
                    requestType:
                      type === "email" ? "EMAIL_CHANGING" : "USERNAME_CHANGING",
                    userEnteredValueToChange: value,
                    userId: userId,
                  });
                } else {
                  toast.error(errorMessage);
                }
              }}
              className={
                "h-[75px] w-[200px] rounded-2xl border-4 border-black bg-custom-orange-200 text-2xl uppercase text-white"
              }
            />
            <ButtonWithLink
              title={"Anuluj"}
              onClick={() => closeModal()}
              className={
                "h-[75px] w-[200px] rounded-2xl border-4 border-black bg-custom-orange-200 text-2xl uppercase text-white"
              }
            />
          </div>
        </DefaultModal>
      )}
    </AnimatePresence>
  );
};

export default AccountFormItemModal;
