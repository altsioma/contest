import { ISagaModule } from "redux-dynamic-modules-saga";
import { loaderSlice } from "./reducer";
import { startSaga } from "./saga";

export const getLoaderModule = (): ISagaModule<typeof loaderSlice.reducer> => ({
  id: "loader",
  reducerMap: {
    loader: loaderSlice.reducer,
  },
  sagas: [startSaga],
});
