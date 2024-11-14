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
import AdminManagementSectionColumn from "../table/AdminManagementSectionColumn.jsx";

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
        "w-full max-lg:h-auto lg:h-[100px] bg-custom-gray-300 p-2 rounded-2xl border-2 border-black flex max-sm:flex-col items-center"
      }
    >
      <div
        className={
          "grid max-sm:gap-6 max-lg:gap-4 max-sm:grid-rows-4 max-sm:grid-cols-1 max-lg:grid-cols-2 max-lg:grid-rows-2 lg:grid-cols-4 sm:w-[95%]"
        }
      >
        <AdminManagementSectionColumn
          name={"Prośba użytkownika:"}
          value={user.username}
        />
        <AdminManagementSectionColumn
          name={"Typ prośby:"}
          value={
            requestType === "EMAIL_CHANGING"
              ? "Zmiana adresu e-mail"
              : "Zmiana nazwy uzytkownika"
          }
        />
        <AdminManagementSectionColumn
          name={"Wprowadzona wartość:"}
          value={enteredValueToChange}
        />
        <AdminManagementSectionColumn
          name={"Obecna wartość:"}
          value={requestType === "EMAIL_CHANGING" ? user.email : user.username}
        />
      </div>
      <div
        className={
          "sm:w-[5%] h-full flex max-sm:mt-8 sm:flex-col max-lg:justify-center max-lg:gap-4 lg:justify-between"
        }
      >
        <button
          onClick={() => acceptUserRequest(requestId)}
          className={
            "bg-white  size-8 rounded-full flex items-center justify-center"
          }
        >
          <AcceptIcon size={"size-8"} />
        </button>
        <button
          onClick={() => rejectUserRequest(requestId)}
          className={
            "bg-white size-8 rounded-full flex items-center justify-center"
          }
        >
          <DeleteIcon size={"size-8"} />
        </button>
      </div>
    </li>
  );
};

export default RequestToAdminCard;
