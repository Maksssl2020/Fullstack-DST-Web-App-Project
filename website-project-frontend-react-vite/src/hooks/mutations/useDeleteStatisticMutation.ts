import { useMutation, useQueryClient } from "react-query";
import { handleDeleteStatistic } from "../../helpers/api-integration/StatisticsHandling.js";

function UseDeleteStatisticMutation() {
  const queryClient = useQueryClient();

  const { mutate: deleteStatistic, isLoading: deletingStatistic } = useMutation(
    {
      mutationKey: ["deleteStatistic"],
      mutationFn: (statisticId) => handleDeleteStatistic(statisticId),
      onMutate: async (statisticId) => {
        await queryClient.cancelQueries(["statisticsData"]);
        const previousStatistics = queryClient.getQueryData(["statisticsData"]);

        queryClient.setQueryData(["statisticsData"], (old = []) => {
          return old.filter((statistic) => statistic.id !== statisticId);
        });

        return { previousStatistics };
      },
      onError: (error, variables, context) => {
        queryClient.setQueryData(
          ["statisticsData"],
          context.previousStatistics,
        );
        console.log(error);
      },
      onSettled: () => {
        queryClient.invalidateQueries("statisticsData");
      },
    },
  );

  return { deleteStatistic, deletingStatistic };
}

export default UseDeleteStatisticMutation;
