import { dataToArea } from "./helpers";

describe("Scale source data SVG to area coordinates", () => {
  it("if data is empty return empty array", () => {
    expect(dataToArea([], { width: 600, height: 300 })).toEqual([]);
  });

  it("convert stable data to stable area expected correct result", () => {
    expect(dataToArea([60, 80, 90], { width: 600, height: 300 })).toEqual([
      [0, 60],
      [200, 80],
      [400, 90],
    ]);
  });
});
