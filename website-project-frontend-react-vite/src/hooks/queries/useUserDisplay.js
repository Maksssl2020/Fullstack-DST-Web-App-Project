import { useQuery } from "react-query";
import { fetchUserDisplayData } from "../../helpers/api-integration/UserDataHandling.js";

function useUserDisplay(userId) {
  const { data: userDisplay, isLoading: fetchingUserDisplay } = useQuery(
    ["forumPostUserAvatar", userId],
    () => fetchUserDisplayData(userId),
  );

  return { userDisplay, fetchingUserDisplay };
}

export default useUserDisplay;
