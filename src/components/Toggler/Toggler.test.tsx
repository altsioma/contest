import React from "react";
import { shallow } from "enzyme";
import { Toggler } from "./Toggler";
import * as faker from "faker";
import { matchers } from "jest-emotion";
import toJson from "enzyme-to-json";

const onClick = jest.fn();
expect.extend(matchers);

describe("Toggler behaviour check", () => {
  const color = faker.commerce.color();

  it("Toggler on click event work", () => {
    const wrapper = shallow(
      <Toggler color="red" label="red" onClick={onClick} />
    );
    wrapper.simulate("click");
    expect(onClick).toBeCalledTimes(1);
  });

  it("is click on active toggler invert returned status", () => {
    const wrapper = shallow(
      <Toggler color="red" label="red" onClick={(status) => onClick(status)} />
    );
    wrapper.simulate("click");
    expect(onClick).toHaveBeenCalledWith(true);
  });

  it("Toggler with disabled isActive has transparent background", () => {
    const wrapper = shallow(
      <Toggler color="#FFF" label="test" onClick={onClick} />
    );
    expect(wrapper.props()).toHaveProperty("isActive", false);
  });

  it("Toggler with isActive = false status has transparent background", () => {
    const wrapper = shallow(
      <Toggler color="#FFF" label="test" onClick={onClick} />
    );
    expect(toJson(wrapper.render())).toHaveStyleRule(
      "background-color",
      "transparent !important"
    );
  });

  it("Toggler with isActive = true status has padding-left", () => {
    const wrapper = shallow(
      <Toggler color="#FFF" label="test" onClick={onClick} isActive />
    );
    expect(toJson(wrapper.render())).toHaveStyleRule("padding-left", "30px");
  });

  it(`Toggler with props color=${color} has expected the same color styles:`, () => {
    const expectedStyle = { backgroundColor: color, borderColor: color };
    const wrapper = shallow(
      <Toggler color={color} label="lime" onClick={onClick} isActive />
    );
    expect(wrapper.props()).toHaveProperty("style", expectedStyle);
  });
});
