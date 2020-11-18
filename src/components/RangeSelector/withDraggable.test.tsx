import React from "react";
import { withDraggable } from "./withDraggable";
import { RangeWindow, RangeHanlder } from "./RangeSelector";
import { shallow } from "enzyme";

describe("Slider Range handler work correct", () => {
  it("RangeWindowMovie", () => {
    const handleWindow = jest.fn();
    const WrappedComponent = withDraggable(RangeWindow, handleWindow);
    const wrap = shallow(
      <WrappedComponent
        style={{ left: 10, right: 10 }}
        onMouseDown={handleWindow}
      />
    );
    wrap.invoke("onMouseDown")(
      {
        nativeEvent: {
          PageX: 200,
        },
      },
      9000
    );
    expect(handleWindow).toBeCalled();
  });
});
