import React from "react";
import { ChartGrid } from "./ChartGrid";
import { ChartView, IChartView } from "@/components/ChartView";

const area: IChartView = { width: 800, height: 154 };

export default {
  title: "Example/ChartGrid",
  component: ChartGrid,
};

const Template = () => (
  <ChartView area={area}>
    <ChartGrid
      area={{ width: 800, height: 400 }}
      xAxis={["10", "20", "30", "40"]}
    />
  </ChartView>
);
export const Primary = Template.bind({});
