import { AppState } from "@/store";
import { LineChart } from "@/types";
import { convertCharts } from "@/modules/Chart/handlers";
import { IChartView } from "components/ChartView";

export const selectChartsData = (state: AppState): LineChart[] =>
  convertCharts(state.loader.data);

export const selectArea = (state: AppState): IChartView => state.app.area;
