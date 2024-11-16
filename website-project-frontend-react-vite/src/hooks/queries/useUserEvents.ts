import { useQuery } from "react-query";
import { fetchAllUserEvents } from "../../helpers/api-calls/EventsHandling.js";
import useAuthentication from "../others/useAuthentication.js";

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
