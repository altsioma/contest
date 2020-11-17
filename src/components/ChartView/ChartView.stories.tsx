import React, { useState } from "react";

import { ChartGrid } from "@/components/ChartGrid";
import { ChartView, IChartView } from "@/components/ChartView";
import { RangeSelector } from "@/components/RangeSelector";
import { Toggler, TogglerGroup } from "@/components/Toggler";
import { action } from "@storybook/addon-actions";

export default {
  title: "Example/AppComposition",
  component: ChartView,
};

const xAxisSamples = ["10", "11", "12", "13", "14", "15", "18", "16", "17"];
const area: IChartView = { width: 800, height: 400 };

const Template = () => {
  const [position, setPosition] = useState({ left: 0, right: 0 });
  return (
    <ChartView area={area}>
      <ChartGrid xAxis={xAxisSamples} area={area} />
      <RangeSelector position={position} setPosition={setPosition} />
      <TogglerGroup>
        <Toggler
          onClick={(status) => action(`status :${status.toString()}`)}
          label="mint"
          color="rgb(158, 212, 72)"
          isActive
        />
        <Toggler
          onClick={(status) => action(`status :${status.toString()}`)}
          label="strawberry"
          color="rgb(254, 60, 48)"
        />
      </TogglerGroup>
    </ChartView>
  );
};
export const Primary = Template.bind({});
