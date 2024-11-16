import { useQuery } from "react-query";
import { fetchUserAmountOfCreatedForumPosts } from "../../helpers/api-calls/UserDataHandling.js";

function useUserAmountOfCreatedForumPosts(userId) {
  const {
    data: userAmountOfCreatedForumPosts,
    isLoading: fetchingUserAmountOfCreatedForumPosts,
  } = useQuery(["userAmountOfCreatedForumPosts", userId], () =>
    fetchUserAmountOfCreatedForumPosts(userId),
  );

  return {
    userAmountOfCreatedForumPosts,
    fetchingUserAmountOfCreatedForumPosts,
  };
}

export default useUserAmountOfCreatedForumPosts;
