import React from "react";
import { Link } from "react-router-dom";
import CheckIcon from "../../icons/CheckIcon";
import { useMutation, useQueryClient } from "react-query";
import { markNotificationAsRead } from "../../helpers/api-integration/NotificationsHandling";
import Spinner from "../universal/Spinner";

const NotificationCard = ({ data }) => {
  const queryClient = useQueryClient();
  const { id, message, notificationContentTitle, link, read } = data;

  const {
    mutate: updateNotificationStatus,
    isLoading: updatingNotificationStatus,
  } = useMutation({
    mutationKey: ["updateNotificationStatus", id],
    mutationFn: () => markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries("amountOfNonReadUserNotifications");
      queryClient.invalidateQueries("userNotificationsData");
    },
    onError: (error) => console.error(error),
    enabled: read === false,
  });

  if (updatingNotificationStatus) {
    return <Spinner />;
  }

  return (
    <div className="w-full h-[200px] relative bg-white border-4 border-custom-gray-300 rounded-2xl p-2 flex flex-col gap-2 items-center justify-center">
      {!read && (
        <button
          onClick={updateNotificationStatus}
          className="absolute bg-custom-gray-300 rounded-full right-0 top-0 mr-2 mt-2"
        >
          <CheckIcon size="size-8" />
        </button>
      )}
      <h2 className="text-lg">{message}</h2>
      <h2 className="text-2xl text-custom-orange-200 text-center">
        {`"${notificationContentTitle}"`}
      </h2>
      <h2 className="text-lg">Kliknij w link aby zobaczyć:</h2>
      <Link
        onClick={updateNotificationStatus}
        to={link}
        className="text-lg text-custom-blue-400"
      >
        {link}
      </Link>
    </div>
  );
};

export default NotificationCard;
