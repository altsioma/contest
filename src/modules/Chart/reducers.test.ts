import { actions, reducer, initialState, Toggler } from "./reducer";

describe("Global app actions", () => {
  it("set active charts", () => {
    const setActiveChartData = 1;
    const expectedState = {
      ...initialState,
      activeChart: setActiveChartData,
    };

    expect(
      reducer(initialState, actions.setActiveChart(setActiveChartData))
    ).toEqual(expectedState);
  });

  it("set night theme", () => {
    const setNightThemeData = true;
    const expectedState = {
      ...initialState,
      isNightMode: setNightThemeData,
    };
    expect(
      reducer(initialState, actions.switchTheme(setNightThemeData))
    ).toEqual(expectedState);
  });

  it("disable one of charts", () => {
    const initialStateWithData = {
      ...initialState,
      charts: [
        {
          collection: [
            { color: "#3DC23F", name: "#0", points: [124, 114, 64] },
            { color: "#F34C44", name: "#1", points: [50, 73, 52] },
          ],
          maxY: 124,
          togglers: { "#0": true, "#1": true },
          x: [1551830400000, 1551916800000, 1552003200000],
        },
      ],
    };
    const toggleActiveData: Toggler = {
      name: "#1",
      status: false,
    };
    const expectedState = {
      ...initialStateWithData,
      charts: [
        {
          collection: [
            { color: "#3DC23F", name: "#0", points: [124, 114, 64] },
            { color: "#F34C44", name: "#1", points: [50, 73, 52] },
          ],
          maxY: 124,
          togglers: { "#0": true, "#1": false },
          x: [1551830400000, 1551916800000, 1552003200000],
        },
      ],
    };
    expect(
      reducer(initialStateWithData, actions.toggleActive(toggleActiveData))
    ).toEqual(expectedState);
  });
});
