import React from "react";
import { shallow } from "enzyme";
import {
  RangeSelector,
  RangeWindow,
  RangeMask,
  RangeHanlder,
} from "./RangeSelector";
import * as faker from "faker";
import { matchers } from "jest-emotion";
import toJson from "enzyme-to-json";

const setPosition = jest.fn();
expect.extend(matchers);

describe("RangeSelector behaviour check", () => {
  it("is RangeSelector with stable date to match snapshot", () => {
    const wrapper = shallow(
      <RangeSelector
        position={{ left: 10, right: 10 }}
        setPosition={setPosition}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it("RangeMask with isNight have night theme color", () => {
    const wrapper = shallow(<RangeMask isNight={true} />);
    expect(toJson(wrapper.render())).toHaveStyleRule(
      "background",
      "rgba(48,66,89,0.6)"
    );
  });
  it("RangeMask with isLeft have border-top-left-radius", () => {
    const wrapper = shallow(<RangeMask isLeft={true} />);
    expect(toJson(wrapper.render())).toHaveStyleRule(
      "border-top-left-radius",
      "8px"
    );
  });
  it("RangeMask without isLeft have border-top-right-radius", () => {
    const wrapper = shallow(<RangeMask />);
    expect(toJson(wrapper.render())).toHaveStyleRule(
      "border-top-right-radius",
      "8px"
    );
  });

  it("RangeHanlder with isNight have night theme color", () => {
    const wrapper = shallow(<RangeHanlder isNight={true} />);
    expect(toJson(wrapper.render())).toHaveStyleRule("background", "#56626D");
  });

  it("RangeHanlder with isLeft have border-top-left-radius", () => {
    const wrapper = shallow(<RangeHanlder isLeft={true} />);
    expect(toJson(wrapper.render())).toHaveStyleRule(
      "border-top-left-radius",
      "8px"
    );
  });

  it("RangeHanlder without isLeft have border-top-right-radius", () => {
    const wrapper = shallow(<RangeHanlder />);
    expect(toJson(wrapper.render())).toHaveStyleRule(
      "border-top-right-radius",
      "8px"
    );
  });
});
