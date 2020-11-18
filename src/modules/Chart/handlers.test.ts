import { convertCharts, calcTransformRange, filterByRange } from "./handlers";

describe("Handlers of positions and filter diapasons tests", () => {
  it("Is Transform range pixels to coefficient work correctly", () => {
    expect(
      calcTransformRange({ left: 100, right: 200 }, { width: 800, height: 600 })
    ).toEqual({ left: 0.125, right: 0.75 });
  });
  it("Is filterByRange with different coefficient work correctly", () => {
    expect(filterByRange([0, 1, 2, 3], { left: 0.125, right: 0.75 })).toEqual([
      0,
      1,
      2,
    ]);
  });

  it("Is filterByRange with the same coefficient work correctly", () => {
    expect(filterByRange([0, 1, 2], { left: 1, right: 1 })).toEqual([0, 1, 2]);
  });
});

describe("Chart data coverter tests", () => {
  it("Is convert mock data working correct", () => {
    const inputData = [
      {
        columns: [
          ["x", 1551830400000, 1551916800000, 1552003200000],
          ["y0", 124, 114, 64],
          ["y1", 50, 73, 52],
        ],
        types: { y0: "line", y1: "line", x: "x" },
        names: { y0: "#0", y1: "#1" },
        colors: { y0: "#3DC23F", y1: "#F34C44" },
      },
    ];
    const expectedData = [
      {
        collection: [
          { color: "#3DC23F", name: "#0", points: [124, 114, 64] },
          { color: "#F34C44", name: "#1", points: [50, 73, 52] },
        ],
        maxY: 124,
        togglers: { "#0": true, "#1": true },
        x: [1551830400000, 1551916800000, 1552003200000],
      },
    ];
    expect(convertCharts(inputData)).toEqual(expectedData);
  });
});
