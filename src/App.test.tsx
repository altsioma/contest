import React from "react";
import { shallow } from "enzyme";
import { App } from "@/App";

describe("Integration test full app", () => {
  it("to match snapshot", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
