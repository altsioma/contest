import React from "react";
import { Chart } from "@/modules/Chart";
import { Provider } from "react-redux";
import { store } from "@/store";
export const App: React.FC = () => (
  <Provider store={store}>
    <Chart />
  </Provider>
);
