import React, { useState } from "react";
import { RangeSelector } from "./RangeSelector";

export default {
  title: "Example/RangeSelector",
  component: RangeSelector,
};

const Template = () => {
  const [position, setPosition] = useState({ left: 0, right: 0 });
  return (
    <div>
      <RangeSelector position={position} setPosition={setPosition} />
      <div>Left position: {position.left} </div>
      <div>Right position: {position.right}</div>
    </div>
  );
};

export const Primary = Template.bind({});
