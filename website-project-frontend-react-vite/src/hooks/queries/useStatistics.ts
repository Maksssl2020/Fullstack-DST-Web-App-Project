import { useQuery } from "react-query";
import { fetchAllStatistics } from "../../helpers/api-calls/StatisticsHandling.js";

function UseStatistics() {
  const { data: statistics, isLoading: fetchingStatistic } = useQuery(
    ["statisticsData"],
    () => fetchAllStatistics(),
  );

  return { statistics, fetchingStatistic };
}

export default UseStatistics;
