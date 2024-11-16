import { useMutation, useQueryClient } from "react-query";
import { handleUpdateStatistic } from "../../helpers/api-calls/StatisticsHandling.js";

function UseUpdateStatisticMutation(statisticId, onSuccessCallback) {
  const queryClient = useQueryClient();

  const { mutate: updateStatistic, isLoading: updatingStatistic } = useMutation(
    {
      mutationKey: ["updateStatistic"],
      mutationFn: (updateData) =>
        handleUpdateStatistic(statisticId, updateData),
      onMutate: async (updateData) => {
        await queryClient.cancelQueries(["statisticsData"]);
        const previousStatistics = queryClient.getQueryData(["statisticsData"]);

        queryClient.setQueryData(["statisticsData"], (old = []) => {
          return old.map((statistic) => {
            if (statistic.id === statisticId) {
              return { ...statistic, ...updateData };
            }
            return statistic;
          });
        });

        return { previousStatistics };
      },
      onError: (error, newStatistic, context) => {
        queryClient.setQueryData(
          ["statisticsData"],
          context.previousStatistics,
        );
        console.log(error);
      },
      onSuccess: () => {
        if (onSuccessCallback) {
          onSuccessCallback();
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(["statisticsData"]);
      },
    },
  );

  return { updateStatistic, updatingStatistic };
}

export default UseUpdateStatisticMutation;
