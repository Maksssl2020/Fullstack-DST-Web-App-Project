import { useQuery } from "react-query";
import { fetchUserDisplayData } from "../../helpers/api-calls/UserDataHandling.js";

function useUserDisplay(userId) {
  const { data: userDisplay, isLoading: fetchingUserDisplay } = useQuery(
    ["userDisplayData", userId],
    () => fetchUserDisplayData(userId),
  );

  return { userDisplay, fetchingUserDisplay };
}

export default useUserDisplay;
