import React from "react";
import { ChartLine } from "./ChartLine";
import { data } from "./chart.mock";
import { SVGContainer } from "@/components/SVGContainer";
import { ChartView } from "@/components/ChartView";

export default {
  title: "Example/ChartLine",
  component: ChartLine,
};
const area = { width: 800, height: 400 };
const Template = () => (
  <ChartView area={area}>
    <SVGContainer>
      <ChartLine
        area={area}
        maxY={320000}
        isActive={true}
        stroke={"rgb(75, 217, 100)"}
        strokeWidth="2.2px"
        data={data}
      />
    </SVGContainer>
  </ChartView>
);

export const Primary = Template.bind({});
