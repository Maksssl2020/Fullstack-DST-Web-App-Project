import axios from "../AxiosConfig";

export const fetchAllStatistics = async () => {
  try {
    const response = await axios.get("/statistics");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleAddStatistic = async (statisticData) => {
  try {
    const response = await axios.post(
      "/statistics/add-statistic",
      statisticData,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const handleUpdateStatistic = async (statisticId, statisticData) => {
  try {
    const response = await axios.put(
      `/statistics/${statisticId}/update-statistic`,
      statisticData,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const handleDeleteStatistic = async (statisticId) => {
  try {
    const response = await axios.delete(`/statistics/${statisticId}/delete`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
