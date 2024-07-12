import React from "react";
import { PieChart } from "@mui/x-charts";

const ReusableChart = ({ chartData, width, height }) => {
  return (
    <PieChart
      margin={{ top: 60, left: 0, right: 0 }}
      series={[
        {
          data: chartData,
          highlightScope: { faded: "global", highlight: "item" },
          faded: { innerRadius: 15, additionalRadius: -30 },
          valueFormatter: function (data) {
            return `${data.value.toLocaleString()}%`;
          },
        },
      ]}
      slotProps={{
        legend: {
          direction: "row",
          position: { horizontal: "middle", vertical: "top" },
        },
      }}
      width={width}
      height={height}
    />
  );
};

export default ReusableChart;
