import { useQuery } from "react-query";
import { fetchPostsData } from "../../helpers/api-integration/ForumPostsHandling.js";

function useForumPosts(currentPage) {
  const {
    data: forumPosts,
    isLoading: fetchingForumPosts,
    refetch,
  } = useQuery(["forumPostsData"], () => fetchPostsData(currentPage), {
    keepPreviousData: true,
  });

  return { forumPosts, fetchingForumPosts, refetch };
}

export default useForumPosts;
