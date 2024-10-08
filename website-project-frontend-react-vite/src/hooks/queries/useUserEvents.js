import { useQuery } from "react-query";
import { fetchAllUserEvents } from "../../helpers/api-integration/EventsHandling.js";
import useAuthentication from "./useAuthentication.js";

function UseUserEvents() {
  const { isAuthenticated, userId } = useAuthentication();

  const { data: userEvents, isLoading: fetchingUserEvents } = useQuery(
    ["userEventsData", userId],
    () => {
      if (isAuthenticated) {
        return fetchAllUserEvents(userId);
      }
    },
  );

  return { userEvents, fetchingUserEvents };
}

export default UseUserEvents;