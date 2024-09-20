import React from "react";
import { PieChart } from "@mui/x-charts";

const ReusableChart = ({ chartData }) => {
  console.log(chartData);

  const data = chartData.map((data) => ({
    id: data.id,
    value: data.value,
    label: data.name,
    color: data.fieldHexColor,
  }));

  console.log(data);

  return (
    <PieChart
      margin={{ top: 60, left: 0, right: 0 }}
      series={[
        {
          data: data,
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
      width={600}
      height={500}
    />
  );
};

export default ReusableChart;
