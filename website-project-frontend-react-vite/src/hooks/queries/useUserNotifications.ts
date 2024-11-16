import { useQuery } from "react-query";
import { fetchUserNotifications } from "../../helpers/api-calls/NotificationsHandling.js";
import useAuthentication from "../others/useAuthentication.js";

function UseUserNotifications() {
  const { userId, isAuthenticated, role } = useAuthentication();

  const { data: userNotifications, isLoading: fetchingUserNotifications } =
    useQuery(["userNotificationsData", userId], () => {
      if (isAuthenticated !== false && role !== "ADMIN") {
        return fetchUserNotifications(userId);
      }
    });

  return { userNotifications, fetchingUserNotifications };
}

export default UseUserNotifications;
