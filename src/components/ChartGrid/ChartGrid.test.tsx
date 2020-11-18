import React from "react";
import { shallow } from "enzyme";
import { ChartGrid } from "./ChartGrid";

describe("Chart Grid render", () => {
  it("is Grid with stable date to match snapshot", () => {
    const wrapper = shallow(
      <ChartGrid
        area={{ width: 800, height: 400 }}
        xAxis={["10", "20", "30", "40"]}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });
});
