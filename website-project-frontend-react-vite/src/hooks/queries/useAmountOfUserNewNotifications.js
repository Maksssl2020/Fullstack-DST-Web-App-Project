import { useQuery } from "react-query";
import { fetchAmountOfNonReadUserNotifications } from "../../helpers/api-integration/NotificationsHandling.js";
import useAuthentication from "./useAuthentication.js";

function UseAmountOfUserNewNotifications() {
  const { isAuthenticated, role, userId } = useAuthentication();

  const {
    data: amountOfUserNewNotifications,
    isLoading: fetchingAmountOfUserNewNotifications,
  } = useQuery(["amountOfUserNewNotifications", userId], () => {
    if (isAuthenticated !== false && role !== "ADMIN") {
      return fetchAmountOfNonReadUserNotifications(userId);
    }
  });

  return { amountOfUserNewNotifications, fetchingAmountOfUserNewNotifications };
}

export default UseAmountOfUserNewNotifications;
