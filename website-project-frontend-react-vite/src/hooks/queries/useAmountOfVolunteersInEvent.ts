import { useQuery } from "react-query";
import { fetchAmountOfVolunteersInEvent } from "../../helpers/api-integration/EventsHandling.js";

function UseAmountOfVolunteersInEvent({ eventId }) {
  const {
    data: amountOfVolunteersInEvent,
    isLoading: fetchingAmountOfVolunteers,
  } = useQuery(["amountOfVolunteersInEvent", eventId], () =>
    fetchAmountOfVolunteersInEvent(eventId),
  );

  return { amountOfVolunteersInEvent, fetchingAmountOfVolunteers };
}

export default UseAmountOfVolunteersInEvent;
