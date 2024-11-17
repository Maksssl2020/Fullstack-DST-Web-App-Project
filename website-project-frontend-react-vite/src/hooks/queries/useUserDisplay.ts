import { useQuery } from "react-query";
import { fetchUserDisplayData } from "../../helpers/api-calls/UserDataHandling.js";
import useAuthentication from "../others/useAuthentication";

function useUserDisplay() {
  const { userId } = useAuthentication();

  const { data: userDisplay, isLoading: fetchingUserDisplay } = useQuery(
    ["userDisplayData", userId],
    async () => (userId ? await fetchUserDisplayData(userId) : undefined),
  );

  return { userDisplay, fetchingUserDisplay };
}

export default useUserDisplay;
