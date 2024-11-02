import { useQuery } from "react-query";
import { fetchUserIsRegisteredInTheEvent } from "../../helpers/api-integration/EventsHandling.js";
import useAuthentication from "../others/useAuthentication.js";

function UseIsUserRegisteredInTheEvent({ eventId }) {
  const { userId } = useAuthentication();

  const { data: isUserRegisteredInEvent, isLoading: checkingUser } = useQuery(
    ["isUserRegisteredInEvent", userId],
    () => fetchUserIsRegisteredInTheEvent(eventId, userId),
  );

  return { isUserRegisteredInEvent, checkingUser };
}

export default UseIsUserRegisteredInTheEvent;
