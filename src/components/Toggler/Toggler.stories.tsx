import React, { useState } from "react";
import { Toggler } from "./Toggler";

export default {
  title: "Example/Toggler",
  component: Toggler,
};

const Template = () => {
  const [statusGlobal, switcher] = useState(true);
  return (
    <>
      <Toggler
        color={"rgb(75, 217, 100)"}
        isActive={statusGlobal}
        label={statusGlobal ? "On" : "Off"}
        onClick={(status) => switcher(status)}
      />
    </>
  );
};

export const Primary = Template.bind({});
