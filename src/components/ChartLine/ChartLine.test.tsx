import React from "react";
import { shallow } from "enzyme";
import { ChartLine } from "./ChartLine";
import { data } from "./chart.mock";

describe("ChartLine render", () => {
  const area = { width: 800, height: 400 };
  it("is ChartLine with stable date to match snapshot", () => {
    const wrapper = shallow(
      <ChartLine
        area={area}
        maxY={320000}
        isActive={true}
        stroke={"rgb(75, 217, 100)"}
        strokeWidth="2.2px"
        data={data}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it("ChartLine with isActive = true has opacity = 1", () => {
    const wrapper = shallow(
      <ChartLine
        area={area}
        maxY={320000}
        isActive={true}
        stroke={"rgb(75, 217, 100)"}
        strokeWidth="2.2px"
        data={data}
      />
    );
    const path = wrapper.find("path");
    const expectedStyle = { opacity: "1" };
    expect(path.props()).toHaveProperty("style", expectedStyle);
  });

  it("ChartLine without isActive status has opacity = 0", () => {
    const wrapper = shallow(
      <ChartLine
        area={area}
        maxY={320000}
        stroke={"rgb(75, 217, 100)"}
        strokeWidth="2.2px"
        data={data}
      />
    );
    const path = wrapper.find("path");
    const expectedStyle = { opacity: "0" };
    expect(path.props()).toHaveProperty("style", expectedStyle);
  });
});
