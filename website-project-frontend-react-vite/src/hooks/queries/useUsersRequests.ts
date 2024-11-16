import { useQuery } from "react-query";
import { fetchAllUsersRequests } from "../../helpers/api-calls/RequestsToAdminHandling.js";

function UseUsersRequests() {
  const { data: usersRequests, isLoading: fetchingUsersRequests } = useQuery(
    ["usersRequestsData"],
    () => fetchAllUsersRequests(),
  );

  return { usersRequests, fetchingUsersRequests };
}

export default UseUsersRequests;
