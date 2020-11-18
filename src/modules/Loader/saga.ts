import { call, put, takeLatest } from "redux-saga/effects";
import { actions, fetchStart } from "./reducer";
import { getData } from "./service";

export function* fetchData() {
  yield put(actions.pending());
  try {
    const data = yield call(getData);
    yield put(actions.fulfilled(data));
  } catch (e) {
    yield put(actions.rejected(e.message));
  }
}

export function* startSaga() {
  yield takeLatest(fetchStart, fetchData);
}
