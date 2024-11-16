import { useQuery } from "react-query";
import { fetchInstagramUserData } from "../../helpers/api-calls/InstagramDataHandling.js";

function useInstagramUser() {
  const { data: instagramUser, isLoading: fetchingInstagramUser } = useQuery(
    ["instagramUserData"],
    () => fetchInstagramUserData(),
  );

  return { instagramUser, fetchingInstagramUser };
}

export default useInstagramUser;
