import { useMutation, useQueryClient } from "react-query";
import { handleAddStatistic } from "../../helpers/api-integration/StatisticsHandling.js";

function UseAddStatisticMutation(onSuccessCallback) {
  const queryClient = useQueryClient();

  const { mutate: addStatistic, isLoading: addingStatistic } = useMutation({
    mutationKey: ["addStatistic"],
    mutationFn: (statisticData) => handleAddStatistic(statisticData),
    onSuccess: () => {
      queryClient.invalidateQueries("statisticsData");
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error) => console.log(error),
  });

  return { addStatistic, addingStatistic };
}

export default UseAddStatisticMutation;
