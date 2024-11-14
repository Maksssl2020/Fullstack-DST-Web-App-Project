import { useQuery } from "react-query";
import { fetchNewsPostDataByPostId } from "../../helpers/api-integration/NewsPostsHandling.js";

function UseNewsPost(newsPostId) {
  const { data: newsPost, isLoading: fetchingNewsPost } = useQuery(
    ["newsPostData", newsPostId],
    () => fetchNewsPostDataByPostId(newsPostId),
  );

  return { newsPost, fetchingNewsPost };
}

export default UseNewsPost;
