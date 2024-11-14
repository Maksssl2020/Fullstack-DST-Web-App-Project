import { useMutation, useQueryClient } from "react-query";
import useAuthentication from "../others/useAuthentication.js";
import { setNotificationAsRead } from "../../helpers/api-integration/NotificationsHandling.js";

function UseMarkNotificationAsReadMutation() {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const {
    mutate: markNotificationAsRead,
    isLoading: markingNotificationAsRead,
  } = useMutation({
    mutationKey: ["updateNotificationStatus"],
    mutationFn: (notificationId) => setNotificationAsRead(notificationId),
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries(["userNotificationsData", userId]);
      const previousNotifications = queryClient.getQueryData([
        "userNotificationsData",
        userId,
      ]);

      queryClient.setQueryData(
        ["userNotificationsData", userId],
        (old = []) => {
          return old.map((notification) => {
            if (notification.id === notificationId) {
              return { ...notification, read: true };
            }
            return notification;
          });
        },
      );

      return { previousNotifications, notificationId };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        ["userNotificationsData", userId],
        context.previousNotifications,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["amountOfUserNewNotifications", userId]);
      queryClient.invalidateQueries(["userNotificationsData", userId]);
    },
  });

  return { markNotificationAsRead, markingNotificationAsRead };
}

export default UseMarkNotificationAsReadMutation;
