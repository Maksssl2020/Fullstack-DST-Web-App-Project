import { useQuery } from "react-query";
import { fetchInstagramUserPostsData } from "../../helpers/api-integration/InstagramDataHandling.js";

function useInstagramUserPosts() {
  const { data: instagramUserPosts, isLoading: fetchingInstagramUserPosts } =
    useQuery(["instagramUserPostsData"], () => fetchInstagramUserPostsData());

  return { instagramUserPosts, fetchingInstagramUserPosts };
}

export default useInstagramUserPosts;
