import { expectSaga, testSaga } from "redux-saga-test-plan";
import { fetchData, startSaga } from "./saga";
import * as faker from "faker";
import { reducer, actions, fetchStart } from "./reducer";
import { throwError } from "redux-saga-test-plan/providers";
import { getData } from "./service";
import * as matchers from "redux-saga-test-plan/matchers";

describe("Loader from API tests", () => {
  it("check is fetching data ok", () => {
    const responseRadnomData = new Array(
      faker.random.number({ min: 4, max: 5 })
    )
      .fill(null)
      .map(() => faker.random.number({ min: 1, max: 100, precision: 0.01 }));

    return expectSaga(fetchData)
      .withReducer(reducer)
      .provide([[matchers.call.fn(getData), responseRadnomData]])
      .put(actions.pending())
      .hasFinalState({
        loading: false,
        data: responseRadnomData,
        error: null,
      })
      .run();
  });

  it("check is fethcing error", () => {
    const error = new Error("API error");
    return expectSaga(fetchData)
      .withReducer(reducer)
      .provide([[matchers.call.fn(getData), throwError(error)]])
      .put(actions.pending())
      .put(actions.rejected(error.message))
      .hasFinalState({
        loading: false,
        data: [],
        error: error.message,
      })
      .run();
  });

  it("fetchStart flow", () => {
    const saga = testSaga(startSaga);
    saga.next().takeLatest(fetchStart, fetchData).next().finish();
  });
});
