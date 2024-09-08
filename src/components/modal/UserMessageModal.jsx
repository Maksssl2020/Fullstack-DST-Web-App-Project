import React, { useContext } from "react";
import DefaultModal from "./DefaultModal";
import { useMutation, useQueryClient } from "react-query";
import {
  handleMessageAsRead,
  handleUpdateUserData,
} from "../../helpers/api-integration/UserDataHandling";
import Spinner from "../universal/Spinner";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import toast from "react-hot-toast";

const UserMessageModal = ({ messageData }) => {
  const { userId, logout } = useContext(AuthContext);
  const { messageId, author, message, messageType, requestToAdminDTO } =
    messageData;
  const queryClient = useQueryClient();

  console.log(messageData);

  const { mutate: markMessageAsRead, isLoading: markingMessageAsRead } =
    useMutation({
      mutationKey: ["markMessageAsRead", messageId],
      mutationFn: () => handleMessageAsRead(messageId),
      onSuccess: () => {
        queryClient.invalidateQueries("allUserNonReadMessages");
      },
      onError: (error) => console.log(error),
    });

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
          logout(),
        );
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
      <div className="flex flex-col gap-1 w-full h-auto">
        <label className="font-bold mr-auto ml-3 text-xl">Treść:</label>
        <div className="w-full h-auto text-xl rounded-2xl border-4 border-black p-4 text-justify bg-red-200">
          {message}
        </div>
      </div>
      {messageType === "DATA_UPDATE_PERMISSION" ? (
        <div className={"flex gap-8"}>
          <button
            onClick={() => {
              markMessageAsRead();
              updateUserData();
            }}
            className="w-[250px] h-[75px] border-4 border-black rounded-2xl mt-6 bg-custom-orange-200 uppercase text-white text-2xl font-bold"
          >
            Akceptuj
          </button>
          <button
            onClick={markMessageAsRead}
            className="w-[250px] h-[75px] border-4 border-black rounded-2xl mt-6 bg-custom-orange-200 uppercase text-white text-2xl font-bold"
          >
            Anuluj
          </button>
        </div>
      ) : (
        <button
          onClick={markMessageAsRead}
          className="w-[250px] h-[75px] border-4 border-black rounded-2xl mt-6 bg-custom-orange-200 uppercase text-white text-2xl font-bold"
        >
          Potwierdź
        </button>
      )}
    </DefaultModal>
  );
};

export default UserMessageModal;