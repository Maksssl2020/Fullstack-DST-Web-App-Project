import { useQuery } from "react-query";
import { fetchEventsData } from "../../helpers/api-calls/EventsHandling.js";

function UseEvents() {
  const { data: events, isLoading: fetchingEvents } = useQuery(
    ["eventsData"],
    () => fetchEventsData(),
  );

  return { events, fetchingEvents };
}

export default UseEvents;
