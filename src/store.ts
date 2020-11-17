import { combineReducers } from "redux";
import { createStore } from "redux-dynamic-modules";
import { getSagaExtension } from "redux-dynamic-modules-saga";

import { chartSlice, getChartModule } from "@/modules/Chart";
import { getLoaderModule, loaderSlice } from "@/modules/Loader";

export const reducer = combineReducers({
  app: chartSlice.reducer,
  loader: loaderSlice.reducer,
});

export type AppState = ReturnType<typeof reducer>;

export const store = createStore<AppState>(
  { extensions: [getSagaExtension({})] },
  getChartModule(),
  getLoaderModule()
);
