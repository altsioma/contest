import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChartView } from "@/components/ChartView";
import { LineChart, RangePosititon } from "@/types";

export type ChartState = {
  area: IChartView;
  activeChart: number;
  position: RangePosititon;
  range: RangePosititon;
  charts: LineChart[];
  isNightMode: boolean;
};

type Toggler = { name: string; status: boolean };

export const initialState: ChartState = {
  area: { width: 800, height: 400 },
  activeChart: 0,
  position: { left: 0, right: 0 },
  range: { left: 0, right: 0 },
  charts: [],
  isNightMode: false,
};

export const parseChart = createAction("chart/parseChart");

export const chartSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    switchTheme: (state, action: PayloadAction<boolean>) => {
      state.isNightMode = action.payload;
    },
    setChart: (state, action: PayloadAction<number>) => {
      state.activeChart = action.payload;
    },
    setPosition: (state, action: PayloadAction<RangePosititon>) => {
      state.position = action.payload;
    },
    setCharts: (state, action: PayloadAction<LineChart[]>) => {
      state.charts = action.payload;
    },
    setRange: (state, action: PayloadAction<RangePosititon>) => {
      state.range = action.payload;
    },
    toggleActive: (state, action: PayloadAction<Toggler>) => {
      const { name, status } = action.payload;
      state.charts[state.activeChart].togglers[name] = status;
    },
  },
});

export const { actions, reducer } = chartSlice;
