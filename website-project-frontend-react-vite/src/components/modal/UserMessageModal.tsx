import React from "react";
import DefaultModal from "./DefaultModal.jsx";
import { useMutation, useQueryClient } from "react-query";
import { handleUpdateUserData } from "../../helpers/api-calls/UserDataHandling.js";
import Spinner from "../universal/Spinner.jsx";
import toast from "react-hot-toast";
import useMarkMessageAsReadMutation from "../../hooks/mutations/useMarkMessageAsReadMutation.js";
import useAuthentication from "../../hooks/others/useAuthentication";
import { Message } from "../../models/Message";
import { logout } from "../../redux/slices/authenticationSlice";
import { useDispatch } from "react-redux";

type UserMessageModalProps = {
  messageData: Message;
};

const UserMessageModal = ({ messageData }: UserMessageModalProps) => {
  const { userId } = useAuthentication();
  const dispatch = useDispatch();
  const { messageId, author, message, messageType, requestToAdminDTO } =
    messageData;
  const queryClient = useQueryClient();
  const { markMessageAsRead, markingMessageAsRead } =
    useMarkMessageAsReadMutation();

  console.log(messageData);

  const { mutate: updateUserData, isLoading: updatingUserData } = useMutation({
    mutationKey: ["updateUserData", userId],
    mutationFn: () => {
      if (requestToAdminDTO.requestType === "EMAIL_CHANGING") {
        return handleUpdateUserData(userId, {
          email: requestToAdminDTO.enteredValueToChange,
        });
      } else {
        return handleUpdateUserData(userId, {
          username: requestToAdminDTO.enteredValueToChange,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("allUserNonReadMessages");
      queryClient.invalidateQueries("accountUserData");

      if (requestToAdminDTO.requestType === "EMAIL_CHANGING") {
        toast.success(
          `Zmieniono adres e-mail na ${requestToAdminDTO.enteredValueToChange}!`,
        );
      } else {
        toast.success(
          `Zmieniono nazwę użytkownika na ${requestToAdminDTO.enteredValueToChange}! Nastąpi wylogowanie.`,
        );
        dispatch(logout());
      }
    },
  });

  if (markingMessageAsRead || updatingUserData) {
    return <Spinner />;
  }

  return (
    <DefaultModal
      title={"Otrzymano Wiadomość!"}
      subtitle={`Wiadomość została wysłana przez admina: ${author}!`}
    >
      <div className="flex h-auto w-full flex-col gap-1">
        <label className="ml-3 mr-auto text-xl font-bold">Treść:</label>
        <div className="h-auto w-full rounded-2xl border-4 border-black bg-red-200 p-4 text-justify text-xl">
          {message}
        </div>
      </div>
      {messageType === "DATA_UPDATE_PERMISSION" ? (
        <div className={"flex gap-8"}>
          <button
            onClick={() => {
              markMessageAsRead(messageId);
              updateUserData();
            }}
            className="mt-6 h-[75px] w-[250px] rounded-2xl border-4 border-black bg-custom-orange-200 text-2xl font-bold uppercase text-white"
          >
            Akceptuj
          </button>
          <button
            onClick={() => markMessageAsRead(messageId)}
            className="mt-6 h-[75px] w-[250px] rounded-2xl border-4 border-black bg-custom-orange-200 text-2xl font-bold uppercase text-white"
          >
            Anuluj
          </button>
        </div>
      ) : (
        <button
          onClick={() => markMessageAsRead(messageId)}
          className="mt-6 h-[75px] w-[250px] rounded-2xl border-4 border-black bg-custom-orange-200 text-2xl font-bold uppercase text-white"
        >
          Potwierdź
        </button>
      )}
    </DefaultModal>
  );
};

export default UserMessageModal;
