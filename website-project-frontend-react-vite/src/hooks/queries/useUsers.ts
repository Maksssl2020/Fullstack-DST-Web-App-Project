import { useQuery } from "react-query";
import { fetchAllUsers } from "../../helpers/api-calls/UserDataHandling.js";

function UseUsers({ chosenFilter = "All" }) {
  const { data: users, isLoading: fetchingUsers } = useQuery(
    ["allUsersData", chosenFilter],
    () => fetchAllUsers(chosenFilter),
  );

  return { users, fetchingUsers };
}

export default UseUsers;
