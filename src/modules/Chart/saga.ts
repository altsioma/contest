import { put, select, takeLatest, fork } from "redux-saga/effects";
import { loaderSlice } from "@/modules/Loader/reducer";
import { selectArea, selectChartsData } from "@/modules/Loader/selectors";
import { chartSlice } from "./reducer";
import { calcTransformRange } from "./handlers";
import { RangePosititon } from "@/types";

export function* parseCharts() {
  const charts = yield select(selectChartsData);
  yield put(chartSlice.actions.setCharts(charts));
}

export function* transformPosition({ payload }: RangePosititon) {
  const area = yield select(selectArea);
  const range = calcTransformRange(payload, area);
  yield put(chartSlice.actions.setRange(range));
}

export function* watchPosition() {
  yield takeLatest(chartSlice.actions.setPosition, transformPosition);
}

export function* watchRequest() {
  yield takeLatest(loaderSlice.actions.fulfilled, parseCharts);
}

export function* chartStartSaga() {
  yield fork(watchRequest);
  yield fork(watchPosition);
}
