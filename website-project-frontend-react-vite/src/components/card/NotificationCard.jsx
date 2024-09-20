import React from "react";
import { Link } from "react-router-dom";
import CheckIcon from "../../icons/CheckIcon.jsx";
import { useMutation, useQueryClient } from "react-query";
import { markNotificationAsRead } from "../../helpers/api-integration/NotificationsHandling.js";
import Spinner from "../universal/Spinner.jsx";
import { DateTimeParser } from "../../helpers/Date.js";

const NotificationCard = ({ data }) => {
  const queryClient = useQueryClient();
  const { id, message, notificationContentTitle, link, isRead, createdAt } =
    data;

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
    enabled: isRead === false,
  });

  if (updatingNotificationStatus) {
    return <Spinner />;
  }

  console.log(data);

  return (
    <div className="w-full h-[200px] relative bg-white border-4 border-custom-gray-300 rounded-2xl p-2 flex flex-col gap-2 items-center justify-center">
      {!isRead && (
        <button
          onClick={updateNotificationStatus}
          className="absolute bg-custom-gray-300 rounded-full right-0 top-0 mr-2 mt-2"
        >
          <CheckIcon size="size-8" />
        </button>
      )}
      <div className="flex flex-col items-center text-[16px]">
        <h2>{DateTimeParser(createdAt)}</h2>
        <h2>{message}</h2>
      </div>
      <h2 className="text-xl text-custom-orange-200 text-center">
        {`"${notificationContentTitle}"`}
      </h2>
      <h2 className="text-[16px]">Kliknij w link aby zobaczyć:</h2>
      <Link
        onClick={updateNotificationStatus}
        to={link}
        className="text-[16px] text-custom-blue-400"
      >
        {link}
      </Link>
    </div>
  );
};

export default NotificationCard;
