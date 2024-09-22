import React, { useContext } from "react";
import { AuthContext } from "../../helpers/provider/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { sendNewNotification } from "../../helpers/api-integration/NotificationsHandling.js";
import Spinner from "../universal/Spinner.jsx";

const AdminFormSection = ({
  children,
  handleSubmit,
  disabledButton,
  submitTitle,
  cancelLink = "/",
  notificationData = undefined,
  sendNotification = false,
}) => {
  const { username } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createNewNotification, isLoading: creatingNewNotification } =
    useMutation({
      mutationKey: ["createNewNotification", notificationData],
      mutationFn: () => {
        if (sendNotification) {
          return sendNewNotification(notificationData);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries("userNotificationsData");
      },
      onError: (error) => console.log(error),
      enabled: notificationData !== undefined && notificationData !== null,
    });

  if (creatingNewNotification) {
    return <Spinner />;
  }

  return (
    <div className="my-8 flex flex-col items-center p-8 gap-6 w-[850px] h-auto border-4 border-black rounded-2xl">
      <div className="w-full flex text-2xl font-bold items-center justify-between mb-8">
        <p>Jesteś zalogowany jako:</p>
        <p>{username}</p>
      </div>
      {children}

      <div className="flex w-full h-[70px] mt-16 text-2xl font-bold text-white gap-4">
        <button
          onClick={() => navigate(cancelLink)}
          className="w-full h-full border-4 border-black bg-custom-orange-200 rounded-3xl uppercase"
        >
          Anuluj
        </button>
        <button
          onClick={() => {
            handleSubmit();
            createNewNotification(notificationData);
          }}
          disabled={disabledButton}
          className="w-full h-full border-4 border-black relative bg-custom-orange-200 rounded-3xl uppercase"
        >
          {submitTitle}
        </button>
      </div>
    </div>
  );
};

export default AdminFormSection;
