import { useQuery } from "react-query";
import { fetchAllNewsPostsData } from "../../helpers/api-calls/NewsPostsHandling.js";

function useNewsPosts(currentPage) {
  const { data: newsPosts, isLoading: fetchingNewsPosts } = useQuery(
    ["newsPostsData", currentPage],
    () => fetchAllNewsPostsData(currentPage),
  );

  return { newsPosts, fetchingNewsPosts };
}

export default useNewsPosts;
