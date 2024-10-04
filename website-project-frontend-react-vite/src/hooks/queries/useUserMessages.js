import { useQuery } from "react-query";
import { fetchUserAllNonReadMessages } from "../../helpers/api-integration/UserDataHandling.js";
import useAuthentication from "./useAuthentication.js";

function UseUserMessages() {
  const { isAuthenticated, userId } = useAuthentication();
  const { data: userMessages, isLoading: fetchingUserMessages } = useQuery(
    ["userMessages", userId],
    () => {
      if (isAuthenticated && userId) {
        return fetchUserAllNonReadMessages(userId);
      }
    },
  );

  return { userMessages, fetchingUserMessages };
}

export default UseUserMessages;
