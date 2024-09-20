import React, { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  fetchUserById,
  handleSendUserMessage,
} from "../../helpers/api-integration/UserDataHandling.js";
import AcceptIcon from "../../icons/AcceptIcon.jsx";
import DeleteIcon from "../../icons/DeleteIcon.jsx";
import {
  handleAcceptRequestToAdmin,
  handleDeleteRequestToAdmin,
} from "../../helpers/api-integration/RequestsToAdminHandling.js";
import Spinner from "../universal/Spinner.jsx";
import toast from "react-hot-toast";
import { AuthContext } from "../../helpers/provider/AuthProvider.jsx";

const RequestToAdminCard = ({ data }) => {
  const { username } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { requestId, requestType, enteredValueToChange, userId } = data;

  const { data: requestUserData, isLoading: fetchingRequestUserData } =
    useQuery(["requestUserData", userId], () => fetchUserById(userId));

  const { mutate: acceptUserRequest, isLoading: acceptingUserRequest } =
    useMutation({
      mutationKey: ["acceptUserRequest", requestId],
      mutationFn: () => handleAcceptRequestToAdmin(requestId),
      onSuccess: () => {
        queryClient.invalidateQueries("usersRequestsData");
        queryClient.invalidateQueries("requestUserData");
        toast.success(
          `Zaakceptowano prośbę użytkownika: ${requestUserData.username}`,
        );
        sendMessageToUser(requestId);
      },
    });

  const { mutate: rejectUserRequest, isLoading: rejectingUserRequest } =
    useMutation({
      mutationKey: ["rejectUserRequest", requestId],
      mutationFn: () => handleDeleteRequestToAdmin(requestId),
      onSuccess: () => {
        queryClient.invalidateQueries("usersRequestsData");
        queryClient.invalidateQueries("requestUserData");
        toast.success(
          `Odrzucono prośbę użytkownika: ${requestUserData.username}`,
        );
        sendMessageToUser(null);
      },
    });

  const { mutate: sendMessageToUser, isLoading: sendingMessageToUser } =
    useMutation({
      mutationKey: ["sendingMessageToUserAfterAcceptingRequest", userId],
      mutationFn: (requestId) => {
        if (requestId !== null) {
          return handleSendUserMessage(userId, {
            author: username,
            message: `Admin wydał pozwolenie na zmianę ${requestType === "EMAIL_CHANGING" ? "adresu e-mail" : "nazwy użytkownika"} na ${enteredValueToChange}. Jeżeli nadal chcesz zmienić danę kliknij ACKEPTUJ.`,
            messageType: "DATA_UPDATE_PERMISSION",
            requestId: requestId,
          });
        } else {
          return handleSendUserMessage(userId, {
            author: username,
            message: `Admin nie zezwolił na zmianę ${requestType === "EMAIL_CHANGING" ? "adresu e-mail" : "nazwy użytkownika"} na ${enteredValueToChange}.`,
            messageType: "INFORMATION",
          });
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries("allUserNonReadMessages");
      },
    });

  if (
    fetchingRequestUserData ||
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
          <p className={"col-span-2"}>{requestUserData.username}</p>
          <p
            className={"col-span-2"}
          >{`${requestType === "EMAIL_CHANGING" ? "Zmiana adresu e-mail" : "Zmiana nazwy uzytkownika"}`}</p>
          <p className={"col-span-2"}>{`${enteredValueToChange}`}</p>
          <p
            className={"col-span-2"}
          >{`${requestType === "EMAIL_CHANGING" ? requestUserData.email : requestUserData.username}`}</p>
        </div>
      </div>
      <div className={"w-[30px] h-full flex flex-col justify-between"}>
        <button
          onClick={acceptUserRequest}
          className={
            "bg-custom-orange-200  size-8 rounded-full flex items-center justify-center"
          }
        >
          <AcceptIcon size={"size-8"} />
        </button>
        <button
          onClick={rejectUserRequest}
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
