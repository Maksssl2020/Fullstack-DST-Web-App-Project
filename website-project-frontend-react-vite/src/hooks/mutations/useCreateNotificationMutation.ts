import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { sendNewNotification } from "../../helpers/api-integration/NotificationsHandling.js";

const UseCreateNotificationMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: createNotification, isLoading: creatingNotification } =
    useMutation({
      mutationKey: ["createNewNotification"],
      mutationFn: (notificationData) => sendNewNotification(notificationData),
      onSuccess: () => {
        queryClient.invalidateQueries("userNotificationsData");
      },
      onError: (error) => console.log(error),
    });

  return { createNotification, creatingNotification };
};

export default UseCreateNotificationMutation;
