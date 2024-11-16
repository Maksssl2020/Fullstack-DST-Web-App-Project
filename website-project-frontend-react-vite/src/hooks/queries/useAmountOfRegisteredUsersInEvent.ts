import { useQuery } from "react-query";
import { fetchAmountOfBasicUsersInEvent } from "../../helpers/api-calls/EventsHandling.js";

function UseAmountOfRegisteredUsersInEvent({ eventId }) {
  const {
    data: amountOfRegisteredUsersInEvent,
    isLoading: fetchingAmountOfRegisteredUsersInEvent,
  } = useQuery(["amountOfBasicUsersInEvent", eventId], () =>
    fetchAmountOfBasicUsersInEvent(eventId),
  );

  return {
    amountOfRegisteredUsersInEvent,
    fetchingAmountOfRegisteredUsersInEvent,
  };
}

export default UseAmountOfRegisteredUsersInEvent;
