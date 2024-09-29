import { useQuery } from "react-query";
import { fetchManagementArticlesData } from "../../helpers/api-integration/ArticleDataHandling.js";

function useManagementArticles() {
  const { data: managementArticles, isLoading: fetchingManagementArticles } =
    useQuery(["managementArticlesData"], () => fetchManagementArticlesData());

  return { managementArticles, fetchingManagementArticles };
}

export default useManagementArticles;
