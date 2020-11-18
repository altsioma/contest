import React from "react";
import { shallow } from "enzyme";
import { ChartView } from "./ChartView";

describe("ChartLine render", () => {
  const area = { width: 800, height: 400 };
  it("is ChartLine with stable date to match snapshot", () => {
    const wrapper = shallow(<ChartView area={area}>Test string</ChartView>);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
