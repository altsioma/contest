import { AppState } from "@/store";
import { Transform } from "@/types";
import { calcTransformRange } from "./handlers";

export const selectTransform = (state: AppState): Transform =>
  calcTransformRange(state.app.range, state.app.area);

export const selectActiveChart = (state: AppState): number =>
  state.app.activeChart;
