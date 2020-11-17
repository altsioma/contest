import { AppState } from "@/store";
import { RangePosititon } from "@/types";
import { calcTransformRange } from "./handlers";

export const selectTransform = (state: AppState): RangePosititon =>
  calcTransformRange(state.app.range, state.app.area);

export const selectActiveChart = (state: AppState): number =>
  state.app.activeChart;
