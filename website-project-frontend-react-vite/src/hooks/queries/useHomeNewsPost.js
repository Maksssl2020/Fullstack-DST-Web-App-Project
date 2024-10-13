import { useQuery } from "react-query";
import { fetchHomeNewsPostData } from "../../helpers/api-integration/NewsPostsHandling.js";

function UseHomeNewsPost(homeNewsPostId) {
  const { data: homeNewsPost, isLoading: fetchingHomeNewsPost } = useQuery(
    [`homeNewsPostData`, homeNewsPostId],
    () => fetchHomeNewsPostData(homeNewsPostId),
  );

  return { homeNewsPost, fetchingHomeNewsPost };
}

export default UseHomeNewsPost;
