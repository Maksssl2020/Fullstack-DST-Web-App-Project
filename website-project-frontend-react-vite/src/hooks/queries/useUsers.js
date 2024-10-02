import { useQuery } from "react-query";
import { fetchAllUsers } from "../../helpers/api-integration/UserDataHandling.js";

function UseUsers() {
  const { data: users, isLoading: fetchingUsers } = useQuery(
    ["allUsersData"],
    () => fetchAllUsers(),
  );

  return { users, fetchingUsers };
}

export default UseUsers;
