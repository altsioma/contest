import { ISagaModule } from "redux-dynamic-modules-saga";
import { reducer } from "./reducer";
import { chartStartSaga } from "./saga";

export const getChartModule = (): ISagaModule<typeof reducer> => ({
  id: "app",
  reducerMap: {
    app: reducer,
  },
  sagas: [chartStartSaga],
});
