import { put, select, takeLatest } from "redux-saga/effects";
import { loaderSlice } from "@/modules/Loader/reducer";
import { selectArea, selectChartsData } from "@/modules/Loader/selectors";
import { actions } from "./reducer";
import { calcTransformRange } from "./handlers";

export function* parseCharts() {
  const charts = yield select(selectChartsData);
  yield put(actions.setCharts(charts));
}

export function* transformPosition(
  action: ReturnType<typeof actions.setPosition>
) {
  const position = action.payload;
  const area = yield select(selectArea);
  const range = yield calcTransformRange(position, area);
  yield put(actions.setRange(range));
}

export function* chartStartSaga() {
  yield takeLatest(actions.setPosition, transformPosition);
  yield takeLatest(loaderSlice.actions.fulfilled, parseCharts);
}
