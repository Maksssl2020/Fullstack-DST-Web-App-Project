import React from "react";
import AcceptIcon from "../../icons/AcceptIcon.jsx";
import DeleteIcon from "../../icons/DeleteIcon.jsx";
import Spinner from "../universal/Spinner.jsx";
import toast from "react-hot-toast";
import useUser from "../../hooks/queries/useUser.js";
import useAcceptUserRequestMutation from "../../hooks/mutations/useAcceptUserRequestMutation.js";
import useRejectUserRequestMutation from "../../hooks/mutations/useRejectUserRequestMutation.js";
import useSendMessageToUserMutation from "../../hooks/mutations/useSendMessageToUserMutation.js";
import useAuthentication from "../../hooks/others/useAuthentication.js";

const RequestToAdminCard = ({ data }) => {
  const { username } = useAuthentication();
  const { requestId, requestType, enteredValueToChange, userId } = data;
  const { user, fetchingUser } = useUser(userId);
  const { sendMessageToUser, sendingMessageToUser } =
    useSendMessageToUserMutation(userId);

  const { acceptUserRequest, acceptingUserRequest } =
    useAcceptUserRequestMutation(userId, () => {
      toast.success(`Zaakceptowano prośbę użytkownika: ${user.username}`);
      sendMessageToUser({
        requestId: requestId,
        messageData: {
          author: username,
          message: `Admin wydał pozwolenie na zmianę ${requestType === "EMAIL_CHANGING" ? "adresu e-mail" : "nazwy użytkownika"} na ${enteredValueToChange}. Jeżeli nadal chcesz zmienić danę kliknij ACKEPTUJ.`,
          messageType: "DATA_UPDATE_PERMISSION",
          requestId: requestId,
        },
      });
    });
  const { rejectUserRequest, rejectingUserRequest } =
    useRejectUserRequestMutation(userId, () => {
      toast.success(`Odrzucono prośbę użytkownika: ${user.username}`);
      sendMessageToUser({
        requestId: null,
        messageData: {
          author: username,
          message: `Admin nie zezwolił na zmianę ${requestType === "EMAIL_CHANGING" ? "adresu e-mail" : "nazwy użytkownika"} na ${enteredValueToChange}.`,
          messageType: "INFORMATION",
        },
      });
    });

  if (
    fetchingUser ||
    sendingMessageToUser ||
    acceptingUserRequest ||
    rejectingUserRequest
  ) {
    return <Spinner />;
  }

  return (
    <li
      className={
        "w-full h-[100px] bg-custom-gray-300 p-2 rounded-2xl border-4 border-black flex items-center"
      }
    >
      <div className={"grid grid-rows-2 w-full"}>
        <div className={"w-full grid grid-cols-8"}>
          <p className={"col-span-2"}>Prośba użytkownika:</p>
          <p className={"col-span-2"}>Typ prośby:</p>
          <p className={"col-span-2"}>Wprowadzona wartość:</p>
          <p className={"col-span-2"}>Obecna wartość:</p>
        </div>
        <div className={"w-full grid grid-cols-8"}>
          <p className={"col-span-2"}>{user.username}</p>
          <p
            className={"col-span-2"}
          >{`${requestType === "EMAIL_CHANGING" ? "Zmiana adresu e-mail" : "Zmiana nazwy uzytkownika"}`}</p>
          <p className={"col-span-2"}>{`${enteredValueToChange}`}</p>
          <p
            className={"col-span-2"}
          >{`${requestType === "EMAIL_CHANGING" ? user.email : user.username}`}</p>
        </div>
      </div>
      <div className={"w-[30px] h-full flex flex-col justify-between"}>
        <button
          onClick={() => acceptUserRequest(requestId)}
          className={
            "bg-custom-orange-200  size-8 rounded-full flex items-center justify-center"
          }
        >
          <AcceptIcon size={"size-8"} />
        </button>
        <button
          onClick={() => rejectUserRequest(requestId)}
          className={
            "bg-custom-orange-200 size-8 rounded-full flex items-center justify-center"
          }
        >
          <DeleteIcon size={"size-8"} />
        </button>
      </div>
    </li>
  );
};

export default RequestToAdminCard;
