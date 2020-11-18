import { expectSaga, testSaga } from "redux-saga-test-plan";
import { chartStartSaga, parseCharts, transformPosition } from "./saga";
import { loaderSlice } from "@/modules/Loader/reducer";
import { selectArea, selectChartsData } from "@/modules/Loader/selectors";
import { select } from "redux-saga/effects";
import { actions, reducer } from "./reducer";

describe("Chart is loading data and transforms by range from positions", () => {
  it("check parsing and save inputed data is ok", () => {
    const chartsMockData = [
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

    return expectSaga(parseCharts)
      .withReducer(reducer)
      .provide([[select(selectChartsData), chartsMockData]])
      .put(actions.setCharts(chartsMockData))
      .hasFinalState({
        area: { width: 800, height: 400 },
        activeChart: 0,
        position: { left: 0, right: 0 },
        range: { left: 0, right: 0 },
        charts: chartsMockData,
        isNightMode: false,
      })
      .run();
  });

  it("check transform position to range work correctly", () => {
    const rangerPosition = { left: 100, right: 100 };
    const transformedExpectedRange = { left: 0.125, right: 0.875 };
    return expectSaga(transformPosition, actions.setPosition(rangerPosition))
      .withReducer(reducer)
      .provide([[select(selectArea), { width: 800, height: 400 }]])
      .put(actions.setRange(transformedExpectedRange))
      .hasFinalState({
        area: { width: 800, height: 400 },
        activeChart: 0,
        position: { left: 0, right: 0 },
        range: transformedExpectedRange,
        charts: [],
        isNightMode: false,
      })
      .run();
  });

  it("watch forks starts", () => {
    const saga = testSaga(chartStartSaga);
    saga
      .next()
      .takeLatest(actions.setPosition, transformPosition)
      .next()
      .takeLatest(loaderSlice.actions.fulfilled, parseCharts)
      .finish();
  });
});
