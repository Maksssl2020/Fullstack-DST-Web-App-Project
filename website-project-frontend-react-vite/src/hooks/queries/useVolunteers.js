import { useQuery } from "react-query";
import { fetchAllVolunteers } from "../../helpers/api-integration/UserDataHandling.js";
import useAuthentication from "./useAuthentication.js";

function UseVolunteers() {
  const { isAuthenticated, role } = useAuthentication();

  const { data: volunteers, isLoading: fetchingVolunteers } = useQuery(
    ["volunteersData"],
    () => {
      if (isAuthenticated && role === "ADMIN") {
        return fetchAllVolunteers();
      }
    },
  );

  return { volunteers, fetchingVolunteers };
}

export default UseVolunteers;
