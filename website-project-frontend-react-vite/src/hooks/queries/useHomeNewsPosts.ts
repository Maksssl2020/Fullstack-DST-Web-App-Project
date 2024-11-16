import { useQuery } from "react-query";
import { fetchHomeNewsPostsData } from "../../helpers/api-calls/NewsPostsHandling.js";

function useHomeNewsPosts() {
  const { data: homeNewsPosts, isLoading: fetchingHomeNewsPosts } = useQuery(
    ["homeNewsPostsData"],
    () => fetchHomeNewsPostsData(),
  );

  return { homeNewsPosts, fetchingHomeNewsPosts };
}

export default useHomeNewsPosts;
